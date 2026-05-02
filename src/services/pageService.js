import prisma from '@/lib/prisma';

export class PageService {
  /**
   * Fetches all pages with optional section inclusion
   */
  static async getAllPages(includeSections = false) {
    try {
      return await prisma.page.findMany({
        include: { sections: includeSections },
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      console.error('PageService.getAllPages Error:', error);
      throw new Error('Failed to fetch pages');
    }
  }

  /**
   * Fetch a specific page by its URL slug
   */
  static async getPageBySlug(slug) {
    try {
      return await prisma.page.findUnique({
        where: { slug: slug },
        include: {
          sections: {
            // Guarantee sections are given to the UI in correct physical order
            orderBy: { sortOrder: 'asc' }
          }
        }
      });
    } catch (error) {
      console.error('PageService.getPageBySlug Error:', error);
      throw new Error(`Failed to fetch page with slug: ${slug}`);
    }
  }

  /**
   * Creates a new page entry
   */
  static async createPage(data) {
    try {
      // Force slug to be lowercase and kebab-case for URL safety
      const formattedSlug = data.slug.toLowerCase().replace(/[\s_]+/g, '-');
      
      return await prisma.page.create({
        data: {
          title: data.title,
          slug: formattedSlug,
          status: data.status || 'draft'
        }
      });
    } catch (error) {
      console.error('PageService.createPage Error:', error);
      throw new Error('Failed to create page');
    }
  }

  /**
   * Deletes a page and all its associated sections
   */
  static async deletePage(pageId) {
    try {
      // Prisma handles cascading deletes if configured in schema, 
      // but we ensure sections are gone too.
      return await prisma.page.delete({
        where: { id: pageId }
      });
    } catch (error) {
      console.error('PageService.deletePage Error:', error);
      throw new Error('Failed to delete page');
    }
  }
}
