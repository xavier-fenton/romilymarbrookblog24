import React, { useState, useEffect } from 'react'
import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'

import sanityClient from '../Client'

import '../styles/textarea.css'

export default function TextArea() {
  const [posts, setPosts] = useState(null)
  const builder = imageUrlBuilder(sanityClient)

  function urlFor(source) {
    return builder.image(source)
  }

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "Posts"]{
      _id,
      title,
      content,
      published_at,
      image,
    }`
      )
      .then((data) => {
        return setPosts(data)
      })
      .catch(console.error)
  }, [])
  const serializer = {
    types: {
      image: ({ value }) => (
        <img src={urlFor(value).height(500).url()} alt={value.alternative} />
      ),
    },
  }
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
                        <PortableText
                          value={data.content}
                          components={serializer}
                        />
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
