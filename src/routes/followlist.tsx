import { Container, Text, Flex, Stack, Tabs } from "@chakra-ui/react";
import data_img from "../assets/images.jpeg";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar/sidebar";
import ProfileSidebar from "../components/Sidebar/profilesidebar";

import SuggestedFollow from "@/components/Sidebar/suggestedfollow";

import { fetchFollowing } from "@/features/follow/fetchfollowing";
import { fetchFollower } from "@/features/follow/fetchfollowers";
import useAuthStore from "@/hooks/newAuthStore";
import { currentUser } from "@/features/users/currentUser";
import { useEffect, useState } from "react";
import FollowButton from "@/components/Follow/followbutton";
function FollowList() {
  const { token, user, setUser } = useAuthStore();
  const [error, setError] = useState("");
  const [following, setFollowingList] = useState<any[]>();
  const [followers, setFollowersList] = useState<any[]>();

  useEffect(() => {
    const getUserData = async () => {
      if (token) {
        try {
          const loginuser = await currentUser(token);
          const followers = await fetchFollower(token, loginuser.id);
          const following = await fetchFollowing(token, loginuser.id);
          setUser(loginuser);
          setFollowersList(followers);
          setFollowingList(following);
          console.log(followers);
          console.log(following);
        } catch (err) {
          setError("User not found or error occurred");
          console.error("Error fetching user data:", err);
          console.log(error);
        }
      }
    };

    if (token) {
      getUserData();
    }
  }, [setUser, setFollowersList, setFollowingList]);

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
          height={"100vh"}
        >
          <Container>
            <Flex gap={3}>
              
              <h3 style={{ color: "white" }}>Follow</h3>
            </Flex>
          </Container>

          <Tabs.Root defaultValue="following">
            <Tabs.List>
              <Tabs.Trigger value="following" asChild>
                <Link to="#following" style={{ textDecoration: "none" }}>
                  <Text fontWeight={"bold"} fontSize={"xl"} color={"white"}>
                    Following
                  </Text>
                </Link>
              </Tabs.Trigger>
              <Tabs.Trigger value="followers" asChild>
                <Link to="#followers" style={{ textDecoration: "none" }}>
                  <Text fontWeight={"bold"} fontSize={"xl"} color={"white"}>
                    Followers
                  </Text>
                </Link>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="following">
              {following?.map((x) => {
                return (
                  <Flex
                    gap={3}
                    mx={"10"}
                    mt={5}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Link
                      to={`/profile/${x.username}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Flex gap={3}>
                        <img
                          src={x.avatar ? x.avatar : data_img}
                          style={{
                            borderRadius: "100%",
                            width: "40px",
                            height: "40px",
                            display: "block",
                          }}
                        />
                        <Flex flexDirection={"column"}>
                          <Text color={"white"} height={"15%"}>
                            {x.fullName}{" "}
                          </Text>
                          <Text color={"#8a8986"}>{x.username}</Text>
                        </Flex>
                      </Flex>
                    </Link>
                    <Flex justifyContent={"flex-end"} alignItems="center">
                      {" "}
                      {user && (
                        <FollowButton userId={x.id} currentUserId={user.id} />
                      )}
                    </Flex>
                  </Flex>
                );
              })}
            </Tabs.Content>
            <Tabs.Content value="followers">
              {followers?.map((x) => {
                return (
                  <Flex
                    gap={3}
                    mx={"10"}
                    mt={5}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Link
                      to={`/profile/${x.username}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Flex gap={3}>
                        <img
                          src={x.avatar ? x.avatar : data_img}
                          style={{
                            borderRadius: "100%",
                            width: "40px",
                            height: "40px",
                            display: "block",
                          }}
                        />
                        <Flex flexDirection={"column"}>
                          <Text color={"white"} height={"15%"}>
                            {x.fullName}{" "}
                          </Text>
                          <Text color={"#8a8986"}>{x.username}</Text>
                        </Flex>
                      </Flex>
                    </Link>
                    <Flex justifyContent={"flex-end"} alignItems="center">
                      {" "}
                      {user && (
                        <FollowButton userId={x.id} currentUserId={user.id} />
                      )}
                    </Flex>
                  </Flex>
                );
              })}
            </Tabs.Content>
          </Tabs.Root>
        </Stack>
        <Stack height={"100%"} position="sticky">
          <Flex
            height={"100%"}
            gap={5}
            mt={10}
            ml={10}
            flexDirection={"column"}
            width={"450px"}
          >
            <ProfileSidebar></ProfileSidebar>
            <SuggestedFollow></SuggestedFollow>
          </Flex>
        </Stack>
      </Flex>
    </>
  );
}

export default FollowList;
