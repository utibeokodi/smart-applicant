/** @jsx jsx */
import { jsx, Box } from 'theme-ui';
import { Link } from 'components/link';

export default function Logo({ isWhite }) {
  return (
    <Link
      path="/"
      sx={{
        variant: 'links.logo',
        fontFamily: "'Great Vibes', cursive",
        fontWeight: 'bold',
        fontSize: [4, 5, 6],
        letterSpacing: 'tighter',
        color: isWhite ? 'white' : 'primary',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block',
        padding: '5px',
        cursor: 'pointer'
        
      }}
    >
      Smart Applicant
    </Link>
  );
}