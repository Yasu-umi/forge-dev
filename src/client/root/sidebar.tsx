import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { tree } from "./api/root";
import { Node } from "./api/types";

const APIsNodeList = ({ node, nested }: { node: Node; nested: number }) => {
  const theme = useTheme();

  const [openedList, setOpenedList] = React.useState<boolean[]>(Object.keys(node).map(() => false));

  const onClick = React.useCallback(
    (i: number) => {
      openedList[i] = !openedList[i];
      setOpenedList([...openedList]);
    },
    [openedList],
  );

  const style = useMemo(() => ({ paddingLeft: (nested + 1) * theme.spacing(2) }), [nested, theme]);

  return (
    <>
      {Object.entries(node).map(([key, value], i) => {
        return (
          <List key={key} component="div" disablePadding={nested !== 0}>
            {"path" in value ? (
              <ListItem button component={NavLink} to={value.path} exact={true} style={style} onClick={() => onClick(i)}>
                <ListItemText primary={key} />
                {value.children ? openedList[i] ? <ExpandLess /> : <ExpandMore /> : null}
              </ListItem>
            ) : (
              <ListItem style={style} onClick={() => onClick(i)}>
                <ListItemText primary={key} />
                {value.children ? openedList[i] ? <ExpandLess /> : <ExpandMore /> : null}
              </ListItem>
            )}
            {value.children ? (
              <Collapse in={openedList[i]} timeout="auto" unmountOnExit>
                <APIsNodeList node={value.children} nested={nested + 1} />
              </Collapse>
            ) : null}
          </List>
        );
      })}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: theme.spacing(30),
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.spacing(30),
  },
  drawerContainer: {
    overflow: "auto",
  },
  list: {},
}));

export const Sidebar = () => {
  const styles = useStyles();
  return (
    <Drawer anchor={"left"} open={true} variant="permanent" className={styles.drawer} classes={{ paper: styles.drawerPaper }}>
      <Toolbar />
      <List component="nav" aria-labelledby="api" className={styles.list}>
        <ListSubheader component="div" id="api">
          APIS
        </ListSubheader>
        <APIsNodeList node={tree} nested={0} />
        <Divider />
      </List>
    </Drawer>
  );
};
