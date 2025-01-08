import { Input, Container, Text, Flex, Stack } from "@chakra-ui/react";
import data_img from "@/assets/images.jpeg";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar/sidebar";
import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import { searchBar } from "@/features/users/searchuser";
import ProfileSidebar from "../components/Sidebar/profilesidebar";
import useAuthStore from "@/hooks/newAuthStore";

import SuggestedFollow from "@/components/Sidebar/suggestedfollow";

import FollowButton from "@/components/Follow/followbutton";
import { currentUser } from "@/features/users/currentUser";
import { User } from "@/types/user";
function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthStore();
  const [loggedIn, setLoggedin] = useState<User>();
  useEffect(() => {
    const getUserData = async () => {
      if (token) {
        try {
          const loginuser = await currentUser(token);

          setLoggedin(loginuser);
          console.log(loginuser);
        } catch (err) {
          setError("User not found or error occurred");
          console.error("Error fetching user data:", err);
        }
      }
    };

    if (token) {
      getUserData();
    }
  }, [token, setLoggedin]);
  const debouncedSearch = debounce(async (username: string) => {
    if (!username.trim()) {
      setUsers([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      if (!token) {
        return;
      }
      const users = await searchBar(token, username);
      setUsers(users);
      console.log(users);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, 300);
  useEffect(() => {
    debouncedSearch(searchTerm);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);
  return (
    <>
      <Flex>
        <Sidebar></Sidebar>
        <Stack
          ml={"20%"}
          width={"45%"}
          height={"100vh"}
          mt={4}
          borderRightWidth={2}
          borderColor={"#3F3F3F"}
        >
          <Container>
            <Flex gap={3}>
              
              <h3 style={{ color: "white" }}>Search</h3>
            </Flex>
          </Container>
          <form action="" style={{ marginTop: "25px" }}>
            <Flex justifyContent={"center"}>
              <Input
                type="text"
                color={"white"}
                borderRadius={"xl"}
                placeholder="Search.."
                width={"80%"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {loading && <div>Loading...</div>}
              {error && <div className="error">{error}</div>}
            </Flex>
          </form>
          {users.map((x) => {
            return (
              <Flex
                width={"80%"}
                gap={2}
                mx={"auto"}
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
                  {/* <Button
                    background={"none"}
                    borderRadius={"xl"}
                    borderColor={"white"}
                  >
                    Follow
                  </Button>{" "} */}
                  {loggedIn && (
                    <FollowButton
                      userId={x.id}
                      currentUserId={loggedIn.id}
                    ></FollowButton>
                  )}
                </Flex>
              </Flex>
            );
          })}
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
export default Search;
