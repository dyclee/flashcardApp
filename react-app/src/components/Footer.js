import React from 'react';

export default function Footer () {
    return (<>
        <div className="footer">
            <div className="footer-text">
                <div className="footer-header">Developed by:</div>
                <div className="footer-name">David Lee</div>
                <div className="footer-icons">
                    <a className="footer-icon" href={`mailto:dyclee@umich.edu`}>
                        <i className="fas fa-envelope fa-1x"></i>
                    </a>
                    <a className="footer-icon" target='_blank' href={`https://www.github.com/dyclee`}>
                        <i className="fab fa-github fa-1x"></i>
                    </a>
                    <a className="footer-icon" target='_blank' href={`https://www.linkedin.com/in/daveyclee`}>
                      <i className="fab fa-linkedin-in fa-1x"></i>
                    </a>
                </div>
            </div>
        </div>
    </>)
}
