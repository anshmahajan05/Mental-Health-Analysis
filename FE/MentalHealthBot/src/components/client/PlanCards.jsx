/* eslint-disable react/no-unknown-property */
import "bootstrap/dist/css/bootstrap.min.css";
import "./plancards.css";
function PlanCards() {
  return (
    <div className='container'>
      <div className='row md-6 mb-3'>
        <div className='col-md-6 mb-2 mx-auto'>
          <div className='card custom-card'>
            <div class='card-header custom-header'>Basic</div>
            <div className='card-body'>
              <p className='card-text'>
                Provides essential mental health resources. Self-assessment
                tools and community support. Great for beginners seeking
                information and guidance. Cost-effective option to start your
                mental health journey. Limited access to professional content
                and personalized support.
              </p>
              <a href='#' class='btn custom-btn btn-lg' role='button'>
                Subscribe
              </a>
            </div>
          </div>
        </div>
        <div className='col-md-6 mb-2 mx-auto'>
          <div className='card custom-card'>
            <div class='card-header custom-header'>Super</div>
            <div className='card-body'>
              <p className='card-text'>
                {" "}
                Provides essential mental health resources. Self-assessment
                tools and community support. Great for beginners seeking
                information and guidance. Cost-effective option to start your
                mental health journey. Limited access to professional content
                and personalized support.
              </p>
              <a href='#' class='btn custom-btn btn-lg' role='button'>
                Subscribe
              </a>
            </div>
          </div>
        </div>
        <div className='col-md-6 mb-3'>
          <div className='card custom-card'>
            <div class='card-header custom-header'>Premium</div>
            <div className='card-body'>
              <p className='card-text'>
                {" "}
                Self-assessment tools and community support. Great for beginners
                seeking information and guidance. Cost-effective option to start
                your mental health journey. Limited access to professional
                content and personalized support.
              </p>
              <a href='#' class='btn custom-btn btn-lg' role='button'>
                Subscribe
              </a>
            </div>
          </div>
        </div>
        <div className='col-md-6 mb-3'>
          <div className='card custom-card'>
            <div class='card-header custom-header'>Prime</div>
            <div className='card-body'>
              <p className='card-text'>
                Self-assessment tools and community support. Great for beginners
                seeking information and guidance. Cost-effective option to start
                your mental health journey. Limited access to professional
                content and personalized support.
              </p>
              <a href='#' class='btn custom-btn btn-lg' role='button'>
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PlanCards;
