/** @jsx jsx */
import { jsx, Box } from 'theme-ui';
import { styles } from './styles/responsive-iframe.style';

const ResponsiveIframe = ({ src, children, ...props }) => {
  return (
    <Box sx={styles.videoContainer}>
      {children ? children : <iframe src={src} {...props}></iframe>}
    </Box>
  );
};

export default ResponsiveIframe;