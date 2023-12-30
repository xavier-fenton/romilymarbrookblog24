import React from 'react'
import '../styles/textarea.css'
import lorem from '../lorem'
export default function TextArea() {
  return (
    <>
      <div className="textarea-main-wrapper">
        <div className="textarea-wrapper">
          <div className="textarea-content-wrapper">
            <div className="textarea-wrapper">
              <div className="textarea-title">Title</div>
              <div className="textarea-content">{lorem}</div>
            </div>
          </div>
          <div className="textarea-date">
            <div className="textarea-date-border"></div>
            <span className="date-time">Published:</span>
            <span className="day-time">Friday, 29 December 2023</span>
          </div>
        </div>
      </div>
    </>
  )
}
