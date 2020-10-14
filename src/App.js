import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

import Moment from "react-moment";
import Paper from "@material-ui/core/Paper";
import Spinner from "./components/Spinner";
import crawler from "./utils/crawler";
import { makeStyles } from "@material-ui/core/styles";
import members from "./data/members";
import styled from "styled-components";

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background-color: #282c34;
  color: #ffffff;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 500px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #282c34;
  padding: 20px;
`;
const TeamName = styled.div`
  margin-top: 2rem;
  font-size: 30px;
  font-weight: 700;
`;
const Days = styled.div`
  padding: 10px;
  font-size: 20px;
  font-weight: 700;
`;
const LinkToPage = styled.div`
  a {
    color: #000000;
    text-decoration: none;
    :hover {
      color: blue;
    }
  }
`;
const TableWrapper = styled.div`
  width: 50%;
  margin-top: 500px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  margin-bottom: 50px;
`;

const RecordImg = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 4px;
  padding: 20px 0;
  img {
    margin: 0 auto;
    width: 48%;
  }
`;

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
  header: {
    backgroundColor: "#333333",
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
    backgroundColor: "#ffcbcb",
  },
  styledProgress: {
    color: "#282c34",
    height: "20px !important",
    width: "20px !important",
  },
});

const sortData = (data) => {
  return data.sort((a, b) => {
    if (a.postCount === b.postCount) {
      return a.name.localeCompare(b.name);
    } else {
      return a.postCount - b.postCount;
    }
  });
};

const initData = members.reduce((dataRefactored, curr) => {
  const [name, url] = curr;
  return dataRefactored.concat({
    name,
    url,
    postCount: Infinity,
  });
}, []);

const START_DATE = new Date("2020-09-13T00:00:00.000+08:00");

const App = () => {
  const classes = useStyles();
  const [data, setData] = useState(initData);
  const [isLoading, setIsLoading] = useState(true);

  // get days
  const now = new Date();

  // during the competition
  // const diff = Math.floor((now - START_DATE) / 86400000);
  // after the competition
  const diff = 0;

  useEffect(() => {
    if (data.length === 0) {
      return;
    }
    const queue = [];
    data.forEach((member) => {
      const { url, name } = member;
      crawler(url).then((postCount) => {
        queue.push({ name, postCount });
      });
    });
    let count = 0;
    const interval = setInterval(() => {
      if (count >= data.length) {
        return clearInterval(interval);
      }
      if (queue.length === 0) {
        return setIsLoading(true);
      }
      setIsLoading(false);
      const { postCount, name } = queue.shift();
      count++;
      setData((data) => {
        const newData = [...data];
        const index = newData.findIndex((m) => m.name === name);
        const newMemberData = { ...newData[index] };
        newMemberData.postCount = Number(postCount);
        newData[index] = newMemberData;
        return newData;
      });
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AppContainer>
      <Spinner isLoading={isLoading} />
      <TitleContainer>
        <TeamName>#OutcomeFirst</TeamName>
        {/* <Days>
          開賽第
          <Moment diff="2020-09-13" unit="days">
            {new Date()}
          </Moment>
          天
        </Days> */}
        <RecordImg>
          <img src="https://i.imgur.com/bzS39xE.png" alt="record" />
        </RecordImg>
      </TitleContainer>

      {data.length > 0 && (
        <TableWrapper>
          <TableContainer component={Paper} className={classes.table}>
            <Table size="small" aria-label="a dense table">
              <TableHead className={classes.header}>
                <TableRow>
                  <TableCell className={classes.headerCell}>Name</TableCell>
                  <TableCell align="right" className={classes.headerCell}>
                    Posts
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortData(data).map(({ name, url, postCount }) => (
                  <TableRow
                    key={name}
                    className={
                      diff <= Number(postCount)
                        ? null
                        : postCount
                        ? classes.drow
                        : null
                    }
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.cell}
                    >
                      <LinkToPage>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {name}
                        </a>
                      </LinkToPage>
                    </TableCell>
                    <TableCell align="right" className={classes.cell}>
                      {Number.isFinite(postCount) ? postCount : "--"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
      )}
    </AppContainer>
  );
};

export default App;
