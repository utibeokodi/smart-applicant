/** @jsx jsx */
import { jsx } from 'theme-ui';
import { motion } from 'framer-motion';
import { styles } from '../styles/accordion/shared.style.js'

export const AccordionButton = ({ children, ...rest }) => (
  <div sx={styles.buttonToggle} {...rest}>
    {children}
  </div>
);

const variants = {
  open: {
    height: 'auto',
    marginTop: 12,
  },
  closed: { height: 0, marginTop: 0 },
};
export function AccordionContents({ isOpen, ...props }) {
  return (
    <motion.div
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      sx={{
        overflowY: 'hidden',
        fontSize: [1, 2],
        lineHeight: 2,
        color: '#343D48',
        paddingLeft: ['33px', '45px'],
        ' > div ': {
          paddingBottom: [1, 2],
        },
      }}
      {...props}
    />
  );
}

export const AccordionItem = ({ isOpen, children, ...rest }) => (
  <div
    css={{
      overflow: 'hidden',
      padding: '17px 0',
      borderBottom: '1px solid #E5ECF4',
      '&:last-child': {
        borderBottom: '0px solid',
      },
    }}
    {...rest}
  >
    {children}
  </div>
);

export const preventClose = (state, changes) =>
  changes.type === 'closing' && state.openIndexes.length < 2
    ? { ...changes, openIndexes: state.openIndexes }
    : changes;

export const single = (state, changes) =>
  changes.type === 'opening'
    ? { ...changes, openIndexes: changes.openIndexes.slice(-1) }
    : changes;

export const combineReducers = (...reducers) => (state, changes) =>
  reducers.reduce((acc, reducer) => reducer(state, acc), changes);
