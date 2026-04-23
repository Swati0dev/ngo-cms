import prisma from '@/lib/prisma';

export class SectionService {
  /**
   * Adds a new section to an existing page
   */
  static async createSection(pageId, type, payload, sortOrder) {
    try {
      return await prisma.section.create({
        data: {
          pageId,
          type, // Ensure this maps perfectly to SECTION_MAP
          payload, 
          sortOrder
        }
      });
    } catch (error) {
      console.error('SectionService.createSection Error:', error);
      throw new Error('Failed to create section record');
    }
  }

  /**
   * Updates an existing section's configuration payload or structural location
   */
  static async updateSection(sectionId, data) {
    try {
      return await prisma.section.update({
        where: { id: sectionId },
        data 
      });
    } catch (error) {
      console.error('SectionService.updateSection Error:', error);
      throw new Error('Failed to update section record');
    }
  }

  /**
   * Permanently deletes a section payload
   */
  static async deleteSection(sectionId) {
    try {
      return await prisma.section.delete({
        where: { id: sectionId }
      });
    } catch (error) {
      console.error('SectionService.deleteSection Error:', error);
      throw new Error('Failed to destroy section');
    }
  }
}
