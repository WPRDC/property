import React from 'react'

import Tooltip from 'material-ui/Tooltip'

const ShortenedText = props => {
  const {text, length = 20} = props;
  const short_text = text.substring(0, length) + '...';

  if (text.length <= length) {
    return <span>{text}</span>
  }
  else {
    return (
      <Tooltip title={text}>
        <span>{short_text}</span>
      </Tooltip>
    )
  }
}

export default ShortenedText;