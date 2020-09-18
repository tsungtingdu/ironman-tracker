import { CircularProgress } from '@material-ui/core'
import Fade from '@material-ui/core/Fade';
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'

const useStyles = makeStyles({
  styledProgress: {
    color: 'rgb(255, 102, 0)',
  },
})
const Spinner = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0%;
  bottom: 0;
  left: 0%;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 999;
`

const LoadingMask = ({isLoading}) => {
  const classes = useStyles()

  return (
    <Spinner style={{ display: isLoading ? "flex" : "none" }}>
      <Fade
          in={isLoading}
          style={{
            transitionDelay: isLoading ? '800ms' : '0ms',
          }}
          unmountOnExit
        >
          <CircularProgress classes={{ root: classes.styledProgress }} />
        </Fade>
    </Spinner >
  )
}

export default LoadingMask
