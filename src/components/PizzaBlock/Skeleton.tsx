import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="279" rx="10" ry="10" width="280" height="18" />
    <circle cx="134" cy="136" r="125" />
    <rect x="0" y="326" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="436" rx="10" ry="10" width="95" height="30" />
    <rect x="128" y="427" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

export default MyLoader;
