import { LinkBox, LinkOverlay, ListIcon, ListItem } from "@chakra-ui/layout";
import NextLink from "next/link";
import { IconType } from "react-icons";

interface SidebarMenuProps {
  menu: {
    name: string;
    route: string;
    icon: IconType;
  };
}

export const SidebarMenu = ({ menu }: SidebarMenuProps) => {
  return (
    <ListItem paddingX="20px" fontSize="14px" fontWeight="bold" key={menu.name}>
      <LinkBox>
        <NextLink href={menu.route} passHref>
          <LinkOverlay>
            <ListIcon as={menu.icon} color="white" marginRight="15px" />
            {menu.name}
          </LinkOverlay>
        </NextLink>
      </LinkBox>
    </ListItem>
  );
};
