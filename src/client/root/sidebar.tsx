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
import React from "react";
import { Node, NodeElement, tree } from "./apis";

const NodeList = ({ node, nested, setNodeElement }: { node: Node; nested: number; setNodeElement: (value: NodeElement) => void }) => {
  const theme = useTheme();

  const [openedList, setOpenedList] = React.useState<boolean[]>(Object.keys(node).map(() => false));

  const onClick = React.useCallback(
    (i: number, value: NodeElement) => {
      openedList[i] = !openedList[i];
      setOpenedList([...openedList]);
      if ("apiURL" in value) {
        setNodeElement(value);
      }
    },
    [openedList, setNodeElement],
  );

  return (
    <>
      {Object.entries(node).map(([key, value], i) => {
        return (
          <List key={key} component="div" disablePadding={nested !== 0}>
            <ListItem button style={{ paddingLeft: (nested + 1) * theme.spacing(1) }} onClick={() => onClick(i, value)}>
              <ListItemText primary={key} />
              {value.children ? openedList[i] ? <ExpandLess /> : <ExpandMore /> : null}
            </ListItem>
            {value.children ? (
              <Collapse in={openedList[i]} timeout="auto" unmountOnExit>
                <NodeList node={value.children} nested={nested + 1} setNodeElement={setNodeElement} />
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

export const Sidebar = ({ setNodeElement }: { setNodeElement: (value: NodeElement) => void }) => {
  const styles = useStyles();
  return (
    <Drawer anchor={"left"} open={true} variant="permanent" className={styles.drawer} classes={{ paper: styles.drawerPaper }}>
      <Toolbar />
      <List component="nav" aria-labelledby="apis" className={styles.list}>
        <ListSubheader component="div" id="apis">
          APIS
        </ListSubheader>
        <NodeList node={tree} nested={0} setNodeElement={setNodeElement} />
        <Divider />
      </List>
    </Drawer>
  );
};
