let competitions;
export default class CompetitionsDAO {
  static async injectDB(db, collectionName) {
    if (competitions) return;
    competitions = db.collection(collectionName || 'competitions_mfh');
    await competitions.createIndex({ name: 'text', code: 'text', areaName: 'text' });
    console.log('[IT302] DAO connected to', competitions.collectionName);
  }
  static async getCompetitions({ filters = {}, pageNumber = 0, itemsPerPage = 20 } = {}) {
    const query = {};
    if (filters.text)
      query.$or = [
        { name: { $regex: filters.text, $options: 'i' } },
        { code: { $regex: filters.text, $options: 'i' } },
        { areaName: { $regex: filters.text, $options: 'i' } }
      ];
    if (filters.type) query.type = filters.type;
    if (filters.areaName) query.areaName = filters.areaName;
    if (filters.plan) query.plan = filters.plan;
    if (filters.code) query.code = filters.code;
    if (typeof filters.currentMatchday === 'number' && !isNaN(filters.currentMatchday)) query.currentMatchday = filters.currentMatchday;
    if (filters.startFrom) query.currentSeasonStart = { ...(query.currentSeasonStart || {}), $gte: filters.startFrom };
    if (filters.endUntil) query.currentSeasonEnd = { ...(query.currentSeasonEnd || {}), $lte: filters.endUntil };
    const cursor = competitions.find(query).skip(pageNumber * itemsPerPage).limit(itemsPerPage);
    const results = await cursor.toArray();
    const totalCount = await competitions.countDocuments(query);
    return { results, totalCount };
  }
}
