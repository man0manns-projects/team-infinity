import './App.css';

import {Home} from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2 className="heading-section mb-5">Carousel #03</h2>
            </div>
            <div className="col-md-12">
              <div className="featured-carousel owl-carousel">
                <div className="item">
                  <div className="work">
                    <div className="img d-flex align-items-end justify-content-center" style={{backgroundImage: 'url(images/work-1.jpg)'}}>
                      <div className="text w-100">
                        <span className="cat">Web Design</span>
                        <h3><a href="#">Working Spaces for Startups Freelancer</a></h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="work">
                    <div className="img d-flex align-items-end justify-content-center" style={{backgroundImage: 'url(images/work-2.jpg)'}}>
                      <div className="text w-100">
                        <span className="cat">Web Design</span>
                        <h3><a href="#">Working Spaces for Startups Freelancer</a></h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="work">
                    <div className="img d-flex align-items-end justify-content-center" style={{backgroundImage: 'url(images/work-3.jpg)'}}>
                      <div className="text w-100">
                        <span className="cat">Web Design</span>
                        <h3><a href="#">Working Spaces for Startups Freelancer</a></h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="work">
                    <div className="img d-flex align-items-end justify-content-center" style={{backgroundImage: 'url(images/work-4.jpg)'}}>
                      <div className="text w-100">
                        <span className="cat">Web Design</span>
                        <h3><a href="#">Working Spaces for Startups Freelancer</a></h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="work">
                    <div className="img d-flex align-items-end justify-content-center" style={{backgroundImage: 'url(images/work-5.jpg)'}}>
                      <div className="text w-100">
                        <span className="cat">Web Design</span>
                        <h3><a href="#">Working Spaces for Startups Freelancer</a></h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
          <Routes>
              <Route exact path='/' element={<Home />} />
          </Routes>
  </BrowserRouter>
  );
}

export default App;
