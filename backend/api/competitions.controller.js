import CompetitionsDAO from '../dao/competitionsDAO.js';
export default class CompetitionsController {
  static async apiGetCompetitions(req, res) {
    try {
      const itemsPerPage = Math.max(1, parseInt(req.query.itemsPerPage, 10) || 20);
      const pageNumber = Math.max(0, parseInt(req.query.pageNumber, 10) || 0);
      const text = (req.query.text || '').trim();
      const type = (req.query.type || '').trim();
      const areaName = (req.query.areaName || '').trim();
      const plan = (req.query.plan || '').trim();
      const code = (req.query.code || '').trim();
      const currentMatchday = req.query.currentMatchday != null ? Number(req.query.currentMatchday) : undefined;
      const startFrom = (req.query.startFrom || '').trim();
      const endUntil = (req.query.endUntil || '').trim();
      const filters = { text, type, areaName, plan, code, currentMatchday, startFrom, endUntil };
      const { results, totalCount } = await CompetitionsDAO.getCompetitions({ filters, pageNumber, itemsPerPage });
      res.json({ success: true, filters, page: pageNumber, itemsPerPage, totalCount, count: results.length, results });
    } catch (e) { console.error(e); res.status(500).json({ success: false, error: e.message }); }
  }
}
