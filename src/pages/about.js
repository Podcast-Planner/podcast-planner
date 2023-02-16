import React from 'react';
import { ArrowFatLeft } from 'phosphor-react';
import bioOne from'../assets/bioOne.jpeg'
import bioTwo from '../assets/bioTwo.jpeg'
import bioThree from '../assets/bioThree.jpeg'
import bioFour from '../assets/bioFour.jpeg'
import {Envelope} from 'phosphor-react';
import {GithubLogo} from 'phosphor-react';
import { LinkedinLogo } from 'phosphor-react';
import {useNavigate}from 'react-router-dom'



const About = () => {
    const navigate = useNavigate();
    return (
<html>
    <div className = 'wrapper'> 
        <button className = 'backButton'onClick={() => navigate(-1)}><ArrowFatLeft size={32} weight="fill" /></button>
        <section className = 'about'>
            <h2 className='team'>Meet The Team</h2> 
            <div className='devWrapper'>
                <div className = 'cardWrapper'>
                    <ul className='profile'>
                        <li className='bioPic'><img src={bioOne} alt="Haley's Tibbet's Bio pic" /></li>
                        <h3 className="name">Haley Tibbitts</h3>
                                <li className='bio'>Hi, I'm Haley! :wave: I'm a Front-End Developer with a passion for creating clean, accessible, and engaging user experiences. My Big Tech Dream™ is to break barriers, create space, and foster belonging in the industry for 2SLGBTQIA+ & neurodivergent folks. 🏳️‍🌈 Check out my links below and drop me a line with your best podcast recommendation! :👇:</li>
                        <div className="social-icons">
                            <div className="icon">
                                <a href ='https://www.linkedin.com/in/haleytibbitts/' target="_blank" rel="noreferrer"><LinkedinLogo size={32}/></a>
                            </div>
                            <div className="icon">
                                <a href='https://github.com/haleytibbitts' target="_blank" rel="noreferrer"><GithubLogo size={32} /></a>
                            </div>
                            <div className="icon">
                                <a href='mailto:haleytibbitts@gmail.com' target="_blank" rel="noreferrer">  
                                <Envelope size={32} /></a>
                            </div>
                        </div>
                     </ul>
                </div>
                <div className='cardWrapper'>
                    <ul className='profile'>
                        <li className='bioPic'><img src={bioFour} alt="Scott Cheong's Bio pic" /></li>
                        <h3 className="name">Scott Cheong</h3>
                                <li className='bio'>As a Web Developer, I strive to craft digital experiences that are not only technically sound, but also intuitive for users. I believe that a human-centered approach is key to creating truly impactful and delightful products. I am passionate about designing with the needs of the user in mind and am eager to be a part of a team that shares this philosophy and continuously pushes the boundaries of web development.</li>
                        <div className="social-icons">
                            <div className="icon">
                                <a href='https://www.linkedin.com/in/scott-cheung/' target="_blank" rel="noreferrer"><LinkedinLogo size={32} /></a>
                            </div>
                            <div className="icon">
                                <a href='https://github.com/luckyNoodles' target="_blank" rel="noreferrer"><GithubLogo size={32} /></a>
                            </div>
                            <div className="icon">
                                    <a href='mailto:scottcx2@gmail.com' target="_blank" rel="noreferrer">
                                <Envelope size={32} /></a>
                             </div>
                        </div>
                    </ul>
                </div>
                        
                    {/* </div>        */}
            {/* <div className= 'rowTwo'> */}
                <div className='cardWrapper'>
                    <ul className='profile'>
                        <li className='bioPic'><img src={bioTwo} alt="Renata Reinartz's Bio pic" /></li>
                        <h3 className="name">Renata Reinartz</h3>
                                <li className='bio'>Hi, 👋 I'm Renata, I'm a front-end developer. Providing end users with clean, well-written, SEO-friendly code is one of my greatest passions. Besides front-end development, I am a CPA, mother, 🧘‍♀️ yoga teacher, travel enthusiast, and advocate for children with special needs. For me, being able to provide accessible websites is also very meaningful. I'd ❤️ to hear from you click on my link below.</li>
                        <div className="social-icons">
                            <div className="icon">
                                <a href='https://www.linkedin.com/in/renata1026/' target="_blank" rel="noreferrer"><LinkedinLogo size={32} /></a>
                            </div>
                            <div className="icon">
                                <a href='https://github.com/renata1026' target="_blank" rel="noreferrer"><GithubLogo size={32} /></a>
                            </div>
                            <div className="icon">
                                <a href='mailto:renata.codes.dev@gmail.com' target="_blank" rel="noreferrer"><Envelope size={32} /></a>
                            </div>
                        </div>
                    </ul>
                </div>
            
                <div className='cardWrapper'>
                    <ul className='profile'>
                        <li className='bioPic'><img src={bioThree} alt="Richard Tillo's Bio pic" /></li>
                        <h3 className="name">Richard Tillo</h3>
                        <li className='bio'>Hello, I’m Richard. I am a front-end developer with experience building applications with JavaScript (ES6+), HTML5, and CSS3.With a background in Mechanical Engineering, I have developed and demonstrated excellent continuous improvement skills and the ability to understand and analyze complex mechanisms.</li>
                        <div className="social-icons">
                            <div className="icon">
                                    <a href='https://www.linkedin.com/in/richard-tillo/' target="_blank" rel="noreferrer"><LinkedinLogo size={32} /></a>
                            </div>
                            <div className="icon">
                                    <a href='https://github.com/richardJET' target="_blank" rel="noreferrer"><GithubLogo size={32} /></a>
                            </div>
                            <div className="icon">
                                <a href='mailto:richardtillo@gmail.com' target="_blank" rel="noreferrer"><Envelope size={32} /></a>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
                            
            {/* </div> */}
                           
        </section>
    </div>    
</html>
            
        
    )
}

export default About