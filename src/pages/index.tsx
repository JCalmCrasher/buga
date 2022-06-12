import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image, Skeleton, SkeletonText } from "@chakra-ui/react";
import GradientLayout from "../components/layout/gradient-layout";
import { useMe } from "../lib/hooks";
import prisma from "../lib/prisma";

const Home = ({ artists }) => {
  const { user, isLoading, isError } = useMe();

  if (isError) return <Box children="error" />;
  
  return (
    <GradientLayout
      color="green"
      description={`${user?.playlistsCount} public playlists`}
      image="https://cdns-images.dzcdn.net/images/artist/19cc38f9d69b352f718782e7a22f9c32/500x500.jpg"
      roundImage
      subtitle="profile"
      title={
        isLoading ? (
          <>
            <Skeleton />
          </>
        ) : (
          `${user?.firstName} ${user?.lastName}`
        )
      }
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artist this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingX="10px" width="20%" key={artist.id}>
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <Image
                  src="https://placekitten.com/301/301"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists }
  };
};
