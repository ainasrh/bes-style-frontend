import React from 'react'

export function decodeAndCorrectImageUrl(url) {
  if (!url) return url;
  const decodeUrl=decodeURIComponent(url)
  const prefixremove='http://127.0.0.1:8000'
  const correctedUrl=decodeUrl.startsWith(prefixremove) ? decodeUrl.slice(prefixremove.length) : decodeUrl
  
  return correctedUrl.replace('/https','https')
 
}


