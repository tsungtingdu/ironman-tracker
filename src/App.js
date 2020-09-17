import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import crawler from './crawler'
import members from './members'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Moment from 'react-moment'

const AppContainer = styled.div`
    width: 100%;
    display: flex;
    position: relative;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    background-color: #282c34;
    color: #ffffff;
`
const TitleContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #282c34;
  padding: 20px;
`
const TeamName = styled.div`
  font-size: 30px;
  font-weight: 700;
`
const Days = styled.div`
  padding: 10px;
  font-size: 20px;
  font-weight: 700;
`
const LinkToPage = styled.div`
  a {
    color: #000000;
    text-decoration: none;
    :hover {
      color: blue;
    }
  }
`
const TableWrapper = styled.div`
  width: 50%;
  margin-top: 100px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  margin-bottom: 50px;
`
const useStyles = makeStyles({
  table: {
    width: "100%",
  },
  header: {
    backgroundColor: "#333333"
  },
  headerCell: {
    color: "#ffffff",
    fontFamily: "Source Code Pro",
    fontWeight: "700",
  },
  cell: {
    fontFamily: "Source Code Pro",
    fontWeight: "700",
  },
  drow: {
    backgroundColor: "#ffb3b3",
  }
})

const App = () => {
  const classes = useStyles()
  const [data, setData] = useState(members)
  const fetchData = useCallback(async () => {
    let tempData = Array.from(data)
    tempData = await crawler(tempData)
    setData(tempData)
  })

  // get days
  let start = new Date('2020-09-13 00:00:00')
  let now = new Date()
  let diff = (Math.floor((now - start)/86400000))

  useEffect(() => {
    fetchData()
  }, [data])

  return (
    <AppContainer>
      <TitleContainer>
        <TeamName>#OutcomeFirst</TeamName>
        <Days>
          開賽第 
          <Moment diff="2020-09-13" unit="days">
             {new Date()}
          </Moment>
          天
        </Days>
      </TitleContainer>
      { data.length > 0 ? (
        <TableWrapper>
          <TableContainer component={Paper} className={classes.table}>
            <Table size="small" aria-label="a dense table">
              <TableHead className={classes.header}>
                <TableRow>
                  <TableCell className={classes.headerCell}>Name</TableCell>
                  <TableCell align="right" className={classes.headerCell}>Posts</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row[0]} className={(diff === Number(row[2])) ? null : ( row[2] ? classes.drow : null)}>
                    <TableCell component="th" scope="row" className={classes.cell}>
                      <LinkToPage><a href={row[1]} target="_blank">{row[0]}</a></LinkToPage>
                    </TableCell>
                    <TableCell align="right" className={classes.cell}>{row[2]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
      ) : ''}
    </AppContainer>
  )
}

export default App
