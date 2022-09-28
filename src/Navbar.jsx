import React from "react";

import {
  Tabs,
  TabList,
  Icon,
  useTab,
  useMultiStyleConfig,
  Button,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { VscHome } from "react-icons/vsc";

function Navbar() {
  const CustomTab = React.forwardRef((props, ref) => {
    // 1. Reuse the `useTab` hook
    const tabProps = useTab({ ...props, ref });

    // 2. Hook into the Tabs `size`, `variant`, props
    const styles = useMultiStyleConfig("NavTab", tabProps);

    return (
      <Button __css={styles} {...tabProps}>
        {tabProps.children}
      </Button>
    );
  });

  return (
    <Tabs variant="soft-rounded" colorScheme="green">
      <TabList>
        <Link to="/">
          <CustomTab variant="primary">
            {/* <Icon as={VscHome} mr="2" /> */}
            Home
          </CustomTab>
        </Link>
        <Link to="videos">
          <CustomTab variant="primary">Videos</CustomTab>
        </Link>
        <Link to="/playlists">
          <CustomTab variant="primary">Playlists</CustomTab>
        </Link>
        <Link to="/groups">
          <CustomTab variant="primary">Groups</CustomTab>
        </Link>
        <Link to="tags">
          <CustomTab variant="primary">Tags</CustomTab>
        </Link>
      </TabList>
    </Tabs>
  );
}

export default Navbar;
