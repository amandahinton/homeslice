// import splashback from './splash.jpg'

const Splash = () => {

  return (
    <div className="homepage"
      // style={{backgroundImage: `url(${splashback})`}}
    >
      <div className="homepage-text">
        <h1 className="homepage-title">Welcome Home!</h1>
        <h2 className="homepage-description">
          Homeslice helps homeowners organize all of the maintenance and repair activities for their home.
        </h2>
        <h4 className="homepage-value">
          Schedule our suggested tasks or create your own. Stay on top of the recurring and one-time needs of your property—from roof inspection to gutter cleaning to appliance upkeep—extending and protecting the value and safety of your home.
        </h4>
      </div>

    </div>
  );
};

export default Splash;
