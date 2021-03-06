import React from 'react'

const styles = {
  bar: {
    height: '10px',
    boxSizing: 'border-box',
    border: '1px solid black',
    borderRadius: '8px',
    margin: '-1px'
  },
  label: {
    fontSize: '0.8rem',
  },
  labelLeft: {
    fontSize: '0.8rem',
    float: 'left',
    textAlign: 'left',
  },
  labelRight: {
    fontSize: '0.8rem',
    float: 'right',
    textAlign: 'right'
  }
}


const ChoroplethBar = props => {
    let {colors, reverse, width, style, labels} = props;
    if (typeof(style) === 'undefined') {
      style = {};
    }
    if (typeof(width) === 'undefined') {
      width = '80px'
    }


    let start = 0,
      stop = colors.length - 1;

    if (reverse) {
      start = stop;
      stop = 0;
    }
    styles.bar.background = `linear-gradient(to right, ${colors[start]}, ${colors[stop]})`;
    styles.bar.width = width;

    return (
      <div>
        <div style={Object.assign({}, styles.bar, style)}>
        </div>
        {labels
          ? (
            <div>
              <span style={styles.labelLeft}>{labels.left}</span>
              <span style={styles.labelRight}>{labels.right}</span>
            </div>
          )
          : String.fromCharCode(160)
        }
      </div>
    )
  }
;

export default ChoroplethBar