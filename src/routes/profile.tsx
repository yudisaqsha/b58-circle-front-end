import { Container, Flex, Stack, Box, Tabs } from "@chakra-ui/react";

import { Link, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar/sidebar";
import ProfileHeader from "../components/Users/profileheader";

import PostProfile from "@/components/Thread/profilepostlist";
import SuggestedFollow from "@/components/Sidebar/suggestedfollow";

import ProfileGallery from "@/components/Thread/picturegallery";

function Profile() {
  const { username } = useParams();

  return (
    <>
      <Flex>
        <Sidebar></Sidebar>
        <Stack
          ml={"20%"}
          width={"45%"}
          mt={4}
          borderRightWidth={2}
          borderColor={"#3F3F3F"}
        >
          <Container>
            <Flex gap={3}>
              
              <h3 style={{ color: "white" }}>Profile</h3>
            </Flex>
          </Container>
          <Stack height={"100%"} px={8}>
            <ProfileHeader username={username} />
          </Stack>

          <Tabs.Root defaultValue="post">
            <Tabs.List>
              <Tabs.Trigger value="post" asChild>
                <Box px={"25%"} borderBottomWidth={2} borderRightWidth={2}>
                  <Link
                    style={{ textUnderlineOffset: "2", color: "white" }}
                    to="#post"
                  >
                    Post
                  </Link>
                </Box>
              </Tabs.Trigger>
              <Tabs.Trigger value="photo" asChild>
                <Box px={"25%"}>
                  <Link
                    style={{ textUnderlineOffset: "2", color: "white" }}
                    to="#photo"
                  >
                    Photo
                  </Link>
                </Box>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="post">
              <PostProfile username={username} />
            </Tabs.Content>
            <Tabs.Content value="photo">
              <ProfileGallery username={username}></ProfileGallery>
            </Tabs.Content>
          </Tabs.Root>
        </Stack>
        <Stack width={"450px"} ml={10} mt={"14"}>
          <SuggestedFollow></SuggestedFollow>
        </Stack>
      </Flex>
    </>
  );
}
export default Profile;
