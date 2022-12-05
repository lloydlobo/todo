// prettier-ignore
import {
  ActionIcon, Anchor, Autocomplete, Avatar, Badge, Box, Button, Center,
  Checkbox,  Code, Container, createStyles, Group, Loader, ScrollArea, Table, Text, TextInput,
  TextInputProps, useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
// prettier-ignore
import { IconArrowLeft, IconArrowRight, IconPencil, IconSearch, IconTrash,
} from "@tabler/icons";
import _ from "lodash";
import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import useSWR from "swr";
import { DivderPill, Layout } from "../components";
import { User } from "../lib/interfaces";
import {
  NotificationError as ToastError,
  NotificationLoading as ToastLoading,
} from "./todos";

export const fetcher = async (url: string) => {
  return await fetch(url).then((res) => res.json());
};

const API_ENDPOINT = "https://todo-6a68.onrender.com";
const API_TOKEN = {
  getAll: "api/getAll",
};

const baseURL = "http://localhost:5000";
//   getNodeEnv() === "development" ? "http://localhost:5000" : API_ENDPOINT;

/**
 * About Page RFC.
 * @returns {JSX.Element}
 */
export default function AboutPage(): JSX.Element {
  const form = useForm<User>();
  const [search, setSearch] = useState("");

  const { data, error, mutate } = useSWR<User[]>(
    `http://localhost:5000/${API_TOKEN.getAll}`,
    fetcher
  );

  const isLoading = !error && !data;
  if (error)
    return <ToastError title={"Server error: useSWR"} message={error} />;
  if (isLoading) return <ToastLoading title={"Loading..."} message={error} />;
  if (!data) return <ToastError title={"No data found!"} message={error} />;

  const handleNewUser = async (values: User): Promise<void> => {
    const updated = await fetch(`${baseURL}/api/post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).then((response) => response.json());

    const uData = _.cloneDeep(data);
    uData.push(updated);

    mutate(uData);
    form.reset();
  };

  const searchUserByID = async (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    id: User["_id"]
  ) => {
    // e.preventDefault();
    const updated = await fetch(`${baseURL}/api/getOne/${id}`, {
      method: "GET",
    }).then((response) => response.json());
    alert(JSON.stringify(updated));
  };

  const renderSearchResult = () => {
    const input = search;
    const users: User[] = searchUsers(input, data);
    return users;
  };

  return (
    <Layout title="About">
      <section title="hero">
        <Container>
          <header>
            <h1 className="text-center">About Page</h1>
            <DivderPill />
            <div className="grid gap-4">
              <div className="mb-8 ">
                <Box sx={{ maxWidth: 300 }} mx="auto">
                  <form
                    onSubmit={form.onSubmit((values) => handleNewUser(values))}
                  >
                    <TextInput
                      withAsterisk
                      label="Name"
                      placeholder="John Doe"
                      {...form.getInputProps("name")}
                    />
                    <TextInput
                      withAsterisk
                      label="Age"
                      placeholder="25"
                      {...form.getInputProps("age")}
                    />
                    <Group position="center" mt="md">
                      <Button variant="outline" type="submit">
                        Submit
                      </Button>
                    </Group>
                  </form>
                </Box>
              </div>

              <div className="grid w-96 place-self-center">
                <input
                  defaultValue={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search.length > 0
                  ? renderSearchResult().map((searchResult: User, index) =>
                      searchResult ? (
                        <div key={`search__${searchResult._id}__${index}`}>
                          <a
                            className="cursor-pointer"
                            onClick={(e) => searchUserByID(e, searchResult._id)}
                          >
                            <div className="flex w-full gap-4">
                              <div className="name flex-1 font-bold">
                                {searchResult.name}
                              </div>
                              <div className="text-xs font-light">
                                {searchResult.age}
                              </div>
                            </div>
                          </a>
                        </div>
                      ) : null
                    )
                  : null}
              </div>

              <SearchBarUsers type={"search"} />
              {/*  */}
              <UsersTable data={data} />
              {/*  */}
            </div>
          </header>
        </Container>
      </section>
    </Layout>
  );
}

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },

  section: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,

    "&:not(:last-of-type)": {
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },
}));

export function SearchBarUsers(props: TextInputProps) {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setValue(val);
    setData([]);

    if (val.trim().length === 0 || val.includes("@")) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(
          ["gmail.com", "outlook.com", "yahoo.com"].map(
            (provider) => `${val}@${provider}`
          )
        );
      }, 1000);
    }
  };

  return (
    <>
      <Autocomplete
        value={value}
        data={data}
        onChange={handleChange}
        icon={<IconSearch size={18} stroke={1.5} />}
        radius="xl"
        size="md"
        placeholder="Search users"
        rightSectionWidth={190}
        rightSection={
          <div className="flex items-center gap-4 pr-4">
            {loading ? (
              <Loader size={16} />
            ) : (
              <Loader size={16} className="opacity-0" />
            )}
            <Code className={classes.searchCode}>Ctrl + K</Code>
            <ActionIcon
              size={32}
              radius="xl"
              color={theme.primaryColor}
              variant="filled"
            >
              {theme.dir === "ltr" ? (
                <IconArrowRight size={18} stroke={1.5} />
              ) : (
                <IconArrowLeft size={18} stroke={1.5} />
              )}
            </ActionIcon>
          </div>
        }
      />
    </>
  );
}

interface UsersTableProps {
  data: {
    avatar?: string;
    name: string;
    age?: number;
    job?: string;
    email?: string;
    _id: string;
    phone?: string;
  }[];
}

const jobColors: Record<string, string> = {
  engineer: "blue",
  manager: "cyan",
  designer: "pink",
};

export function UsersTable({ data }: UsersTableProps) {
  const theme = useMantineTheme();
  const rows = data.map((item) => (
    <tr key={item.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={item.avatar} radius={30} />
          <Text size="sm" weight={500}>
            {item.name}
          </Text>
        </Group>
      </td>

      <td>
        <Badge
          // color={jobColors[item.job.toLowerCase()]}
          variant={theme.colorScheme === "dark" ? "light" : "outline"}
        >
          {item.job}
        </Badge>
      </td>
      <td>
        <Anchor<"a">
          size="sm"
          href="#"
          onClick={(event) => event.preventDefault()}
        >
          {item.email}
        </Anchor>
      </td>
      <td>
        <Text size="sm" color="dimmed">
          {item._id}
        </Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red">
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Job title</th>
            <th>Email</th>
            {/* <th>Phone</th> */}
            <th>ID</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

function searchUsers(name: User["name"], data: User[]): User[] {
  const res: User[] = [];
  const users = data.filter((user) => user.name.includes(name));
  console.log(users);
  res.push(...users);
  return res;
}
