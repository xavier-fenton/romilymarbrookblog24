import React, { useState, useEffect } from 'react'

import sanityClient from '../Client'

import '../styles/textarea.css'

export default function TextArea() {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "Posts"]{
      _id,
      title,
      content,
      published_at,
    }`
      )
      .then((data) => {
        return setPosts(data)
      })
      .catch(console.error)
  }, [])

  function toPlainText(blocks = []) {
    console.log(blocks)
    return (
      blocks
        // loop through each block
        .map((block) => {
          // if it's not a text block with children,
          // return nothing
          if (
            block._type !== 'block' ||
            !block.children ||
            block.children.text === ''
          ) {
            return ''
          }

          // loop through the children spans, and join the
          // text strings

          return block.children.map((child) => (
            <p className="text-area-paragraphs">{child.text}</p>
          ))
        })
      // join the paragraphs leaving split by two linebreaks
    )
  }
  console.log(posts)

  return (
    <>
      <div className="textarea-component-main">
        {posts &&
          posts.map((data) => {
            return (
              <div key={data._id} className="textarea-main-wrapper">
                <div className="textarea-wrapper">
                  <div className="textarea-content-wrapper">
                    <div id={data._id} className="textarea-wrapper">
                      <div className="textarea-title">{data.title}</div>
                      <div className="textarea-content">
                        {toPlainText(data.content)}
                      </div>
                    </div>
                  </div>
                  <div className="textarea-date">
                    <div className="textarea-date-border"></div>
                    <span className="date-time">Published: </span>
                    <span className="day-time">{data.published_at}</span>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}
