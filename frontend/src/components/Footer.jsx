import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='footer'>
        <p>©2022</p>
        <p>Site created by Mehdi Bouaziz</p>
        <a href="https://github.com/mehdibouaziz" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/mehdi-bouaziz/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
    </div>
  )
}

export default Footer