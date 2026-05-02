'use client';

import React from 'react';
import bookData from '../../data/bookContent.json';
import '../../styles/book-viewer.css';

const BookViewer = () => {
  return (
    <div className="book-container">
      <header className="book-header">
        <h1>{bookData.bookTitle}</h1>
        <p className="text-muted">A comprehensive guide to English translation for junior classes</p>
      </header>

      <main className="lesson-grid">
        {bookData.lessons.map((lesson) => (
          <article key={lesson.id} className="lesson-card">
            <h2 className="lesson-title">{lesson.title}</h2>
            <p className="text-muted mb-4">{lesson.description}</p>

            <span className="section-label">Examples</span>
            <div className="examples-list">
              {lesson.examples.map((ex, idx) => (
                <div key={idx} className="example-item">
                  <span className="example-hi">{ex.hi}</span>
                  <span className="example-en">{ex.en}</span>
                </div>
              ))}
            </div>

            <span className="section-label">Vocabulary</span>
            <div className="vocab-list">
              {lesson.vocabulary.map((v, idx) => (
                <div key={idx} className="vocab-tag">
                  <strong>{v.en}</strong>: {v.hi}
                </div>
              ))}
            </div>

            <span className="section-label">Exercise</span>
            <div className="exercise-box">
              {lesson.exercises.map((ex, idx) => (
                <div key={idx}>
                  <p className="text-accent mb-2" style={{ color: '#10b981', fontWeight: 600 }}>{ex.type}</p>
                  <ol className="text-muted pl-4">
                    {ex.items.map((item, i) => (
                      <li key={i} className="mb-1">{item}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </article>
        ))}
      </main>
    </div>
  );
};

export default BookViewer;
