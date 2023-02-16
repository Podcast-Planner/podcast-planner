import React from 'react';
import bioOne from'../assets/bioOne.jpeg'
import bioTwo from '../assets/bioTwo.jpeg'
import bioThree from '../assets/bioThree.jpeg'
import bioFour from '../assets/bioFour.jpeg'
import {Envelope} from 'phosphor-react';
import {GithubLogo} from 'phosphor-react';
import { LinkedinLogo } from 'phosphor-react';


const About = () => {
    return (
        
        <>
        <html>
        <section className = 'about'>
            <h2 className ='team'>Meet The Team</h2>   
            <div className='devWrapper'>
                <div className = 'cardWrapper'>
                    <ul className='profile'>
                        <li className='bioPic'><img src={bioOne} alt="Haley's Tibbet's Bio pic" /></li>
                        <h3 class="name">Haley Tibbet</h3>
                        <li className='bio'>Hi, I'm Haley. With a diverse background in film production, customer service, and retail management, I excel at helping clients (big and small!) stand out from the pack and make meaningful connections with their target demographic through complex problem solving, information analysis, teamwork, and a healthy dash of creativity.</li>
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
                        <h3 class="name">Scott Cheong</h3>
                        <li className='bio'>Hello, I’m Scott. I am a Front-End Web Developer with a background of 10+ years working with multimedia web applications. In that time I developed a joy in working with the great people that produce web and mobile applications because Web Development is a team effort'</li>
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
                        <li className='bio'>Hi there, ✋ I'm Renata!
                        I'm a front-end developer and wear many hats. I am a CPA (Chartered Professional Accountant), mother, certified yoga teacher, and travel enthusiast. For over ten years I created budgets and multi-currency forecasts for multinational companies. I am capable of coming up with creative solutions when problems arise.</li>
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
                        <h3 class="name">Richard Tillo</h3>
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
        </html>
        </>
            
        
    )
}

export default About