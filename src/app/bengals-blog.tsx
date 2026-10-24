'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// ==========================================
// CENTRAL CONTENT REPOSITORY (WRITE ARTICLES HERE)
// ==========================================
const ARTICLES = [
  {
    id: '1',
    slug: 'dominate-afc-north',
    title: 'The Blueprint: How the Bengals Can Dominate the AFC North',
    category: 'Game Analysis',
    date: 'October 10, 2026',
    readTime: '5 min read',
    excerpt: 'A deep-dive tactical breakdown into offensive protection schemes and defensive adjustments required for divisional dominance.',
    featured: true,
  },
  {
    id: '2',
    slug: 'roster-watch-training-camp',
    title: 'Roster Watch: Standouts from Training Camp and Preseason Rotations',
    category: 'Roster & Trades',
    date: 'October 6, 2026',
    readTime: '4 min read',
    excerpt: 'Evaluating the emerging rookies and key depth pieces stepping up into vital rotational roles this fall.',
    featured: false,
  },
  {
    id: '3',
    slug: 'offensive-scheme-breakdown',
    title: 'Offensive Scheme Breakdown: Maximizing Explosive Downfield Routes',
    category: 'Strategy',
    date: 'October 2, 2026',
    readTime: '6 min read',
    excerpt: 'An analytical review of timing, pre-snap reads, and route concepts designed to attack deep zone coverages.',
    featured: false,
  },
];

export default function BengalsBlogBlueprint() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Game Analysis', 'Roster & Trades', 'Strategy'];

  const filteredArticles = activeCategory === 'All'
    ? ARTICLES
    : ARTICLES.filter(art => art.category === activeCategory);

  const featuredArticle = ARTICLES.find(art => art.featured) || ARTICLES[0];

  return (
    <div style={styles.screenContainer}>
      <div style={styles.contentContainer}>
        
     {/* Featured Editorial Hero */}
        <section className="space-y-4">
          {/* Updated Badge Styling for High Readability */}
          <div className="inline-block text-xs font-bold uppercase tracking-widest text-white bg-[#FB4F14] px-3.5 py-1 rounded-md shadow-xs">
            The Official Bengals Blueprint
          </div>
          
          <div className="space-y-3">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Gridiron Strategy & Analysis
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl font-normal leading-relaxed">
              Unfiltered tactical breakdowns, roster metrics, and deep dives into professional football execution.
            </p>
          </div>

          {/* FEATURED HERO ARTICLE */}
          {activeCategory === 'All' && featuredArticle && (
            <div style={styles.heroCard}>
              <div style={styles.heroBadgeRow}>
                <span style={styles.categoryBadge}>{featuredArticle.category}</span>
                <span style={styles.metaText}>{featuredArticle.date} • {featuredArticle.readTime}</span>
              </div>
              <h2 style={styles.heroTitle}>{featuredArticle.title}</h2>
              <p style={styles.heroExcerpt}>{featuredArticle.excerpt}</p>
              <Link href={`/post/${featuredArticle.slug}`} style={styles.primaryButton}>
                Read Featured Analysis →
              </Link>
            </div>
          )}
        </section>

        {/* CATEGORY FILTER BAR */}
        <div style={styles.filterScroll}>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              style={{
                ...styles.filterChip,
                ...(activeCategory === cat ? styles.activeChip : {})
              }}
            >
              <span style={activeCategory === cat ? styles.activeFilterText : styles.filterText}>
                {cat}
              </span>
            </button>
          ))}
        </div>

        {/* ARTICLE GRID / LIST */}
        <div style={styles.sectionHeaderRow}>
          <h3 style={styles.sectionHeading}>
            {activeCategory === 'All' ? 'Recent Breakdowns' : `${activeCategory} Articles`}
          </h3>
          <span style={styles.articleCount}>{filteredArticles.length} Published</span>
        </div>

        <div style={styles.gridContainer}>
          {filteredArticles.map(article => (
            <div key={article.id} style={styles.articleCard}>
              <div style={styles.cardHeaderRow}>
                <span style={styles.categoryBadge}>{article.category}</span>
                <span style={styles.metaText}>{article.date}</span>
              </div>
              <h3 style={styles.articleTitle}>{article.title}</h3>
              <p style={styles.articleExcerpt}>{article.excerpt}</p>
              
              <div style={styles.cardFooterRow}>
                <span style={styles.readTimeText}>{article.readTime}</span>
                <Link href={`/post/${article.slug}`} style={styles.readLink}>
                  Read Article →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* PAGE-SPECIFIC FOOTER */}
        <footer style={styles.footer}>
          <p style={styles.footerBrand}>Bengals Blueprint Blog</p>
          <p style={styles.footerCopy}>© {new Date().getFullYear()} All rights reserved. Built for elite football analysis.</p>
        </footer>

      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  screenContainer: {
    minHeight: '100vh',
    backgroundColor: '#0b0f19',
    color: '#ffffff',
    padding: '40px 20px',
  },
  contentContainer: {
    maxWidth: 900,
    margin: '0 auto',
    width: '100%',
  },
  backButton: {
    display: 'inline-block',
    marginBottom: 20,
    padding: '8px 14px',
    backgroundColor: '#1e293b',
    borderRadius: 8,
    border: '1px solid #334155',
    color: '#cbd5e1',
    fontSize: '13px',
    fontWeight: 600,
    textDecoration: 'none',
  },
  headerBlock: {
    marginBottom: 28,
  },
  pillTag: {
    display: 'inline-block',
    backgroundColor: 'rgba(255, 85, 0, 0.15)',
    padding: '4px 10px',
    borderRadius: 6,
    marginBottom: 10,
    border: '1px solid rgba(255, 85, 0, 0.3)',
  },
  pillTagText: {
    color: '#ff5500',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.5px',
  },
  siteTitle: {
    fontSize: '34px',
    fontWeight: 800,
    color: '#ffffff',
    marginBottom: 8,
  },
  siteSubtitle: {
    fontSize: '16px',
    color: '#94a3b8',
    lineHeight: '22px',
  },
  heroCard: {
    backgroundColor: '#162238',
    borderRadius: 16,
    padding: 24,
    border: '1px solid #ff5500',
    marginBottom: 32,
  },
  heroBadgeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  categoryBadge: {
    fontSize: '12px',
    fontWeight: 700,
    color: '#ff5500',
    backgroundColor: 'rgba(255, 85, 0, 0.1)',
    padding: '4px 8px',
    borderRadius: 4,
  },
  metaText: {
    fontSize: '12px',
    color: '#94a3b8',
  },
  heroTitle: {
    fontSize: '24px',
    fontWeight: 800,
    color: '#ffffff',
    marginBottom: 10,
    lineHeight: '30px',
  },
  heroExcerpt: {
    fontSize: '15px',
    color: '#cbd5e1',
    lineHeight: '22px',
    marginBottom: 20,
  },
  primaryButton: {
    display: 'inline-block',
    backgroundColor: '#ff5500',
    padding: '10px 18px',
    borderRadius: 8,
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 700,
    textDecoration: 'none',
  },
  filterScroll: {
    display: 'flex',
    gap: 10,
    marginBottom: 28,
    overflowX: 'auto',
  },
  filterChip: {
    padding: '8px 16px',
    backgroundColor: '#162238',
    borderRadius: 20,
    border: '1px solid #334155',
    cursor: 'pointer',
  },
  activeChip: {
    backgroundColor: '#ff5500',
    borderColor: '#ff5500',
  },
  filterText: {
    color: '#94a3b8',
    fontSize: '13px',
    fontWeight: 600,
  },
  activeFilterText: {
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 600,
  },
  sectionHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#ffffff',
    margin: 0,
  },
  articleCount: {
    fontSize: '13px',
    color: '#64748b',
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    marginBottom: 40,
  },
  articleCard: {
    backgroundColor: '#162238',
    borderRadius: 12,
    padding: 20,
    border: '1px solid #22304d',
  },
  cardHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  articleTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: 8,
  },
  articleExcerpt: {
    fontSize: '14px',
    color: '#94a3b8',
    lineHeight: '20px',
    marginBottom: 16,
  },
  cardFooterRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #22304d',
    paddingTop: 12,
  },
  readTimeText: {
    fontSize: '12px',
    color: '#64748b',
  },
  readLink: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#ff5500',
    textDecoration: 'none',
  },
  footer: {
    borderTop: '1px solid #1e293b',
    paddingTop: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  footerBrand: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#cbd5e1',
    marginBottom: 4,
  },
  footerCopy: {
    fontSize: '12px',
    color: '#64748b',
  },
};