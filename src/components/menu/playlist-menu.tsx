import { LinkBox, LinkOverlay, ListItem } from "@chakra-ui/layout";
import NextLink from "next/link";

interface PlaylistMenuProps {
  playlist: string;
}

const PlaylistMenu = ({ playlist }) => {
  return (
    <ListItem paddingX="20px" fontSize="14px">
      <LinkBox>
        <NextLink
          href={{
            pathname: "/playlist/[id]",
            query: { id: playlist.id }
          }}
          passHref
        >
          <LinkOverlay>{playlist.name}</LinkOverlay>
        </NextLink>
      </LinkBox>
    </ListItem>
  );
};

export default PlaylistMenu;
