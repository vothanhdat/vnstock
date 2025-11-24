/**
 * Provider Registry for vnstock library
 * 
 * Manages registration and retrieval of data providers
 */

import { DataCategory, ProviderInfo, ProviderType } from './types';

type ProviderClass = new (...args: any[]) => any;

export class ProviderRegistry {
  private static providers: Map<string, Map<string, ProviderClass>> = new Map();
  private static metadata: Map<string, Map<string, ProviderInfo>> = new Map();

  /**
   * Register a provider for a specific category and source
   */
  static register(
    category: string,
    source: string,
    providerClass: ProviderClass,
    type: ProviderType = ProviderType.SCRAPING
  ): void {
    if (!this.providers.has(category)) {
      this.providers.set(category, new Map());
      this.metadata.set(category, new Map());
    }

    const categoryMap = this.providers.get(category)!;
    const metadataMap = this.metadata.get(category)!;

    categoryMap.set(source.toLowerCase(), providerClass);
    
    // Store metadata
    metadataMap.set(source.toLowerCase(), {
      name: source,
      category: category as DataCategory,
      type,
      class_path: providerClass.name,
      supported_methods: Object.getOwnPropertyNames(providerClass.prototype)
        .filter(name => name !== 'constructor' && !name.startsWith('_'))
    });
  }

  /**
   * Get a provider class for a specific category and source
   */
  static get(category: string, source: string): ProviderClass {
    const categoryMap = this.providers.get(category);
    if (!categoryMap) {
      throw new Error(`No providers registered for category: ${category}`);
    }

    const providerClass = categoryMap.get(source.toLowerCase());
    if (!providerClass) {
      const available = Array.from(categoryMap.keys()).join(', ');
      throw new Error(
        `Source '${source}' not found for category '${category}'. ` +
        `Available sources: ${available}`
      );
    }

    return providerClass;
  }

  /**
   * Get metadata for a provider
   */
  static getMetadata(category: string, source: string): ProviderInfo | undefined {
    return this.metadata.get(category)?.get(source.toLowerCase());
  }

  /**
   * List all available sources for a category
   */
  static listSources(category: string): string[] {
    const categoryMap = this.providers.get(category);
    return categoryMap ? Array.from(categoryMap.keys()) : [];
  }

  /**
   * Check if a provider is registered
   */
  static has(category: string, source: string): boolean {
    return this.providers.get(category)?.has(source.toLowerCase()) || false;
  }

  /**
   * Clear all registered providers (mainly for testing)
   */
  static clear(): void {
    this.providers.clear();
    this.metadata.clear();
  }
}
