import { Anchor, Code, Container, List, ListItem, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";

const cgcreateHelpPage = `cgcreate --help
Usage: cgcreate [-h] [-f mode] [-d mode] [-s mode] [-t <tuid>:<tgid>] [-a <agid>:<auid>] -g <controllers>:<path> [-g ...]
Create control group(s)
  -a <tuid>:<tgid>		Owner of the group and all its files
  -d, --dperm=mode		Group directory permissions
  -f, --fperm=mode		Group file permissions
  -g <controllers>:<path>	Control group which should be added
  -h, --help			Display this help
  -s, --tperm=mode		Tasks file permissions
  -t <tuid>:<tgid>		Owner of the tasks file
`;

const cgexecHelpPage = `cgexec --help
Usage: cgexec [-h] [-g <controllers>:<path>] [--sticky] command [arguments] ...
Run the task in given control group(s)
  -g <controllers>:<path>	Control group which should be added
  -h, --help			Display this help
  --sticky			cgred daemon does not change pidlist and children tasks
`;

const pageContent = (
  <>
    <Title>Containers</Title>
    <Text>Everything about containers, from basics through to underlying kernel details and runtimes</Text>
    <Title order={2}>Useful external alternative resources</Title>
    <List>
      <ListItem>
        <Anchor component={Link} href={"https://jvns.ca/blog/2016/10/10/what-even-is-a-container/"}>
          A brief overview of Linux namespaces and cgroups by Julia Evans
        </Anchor>
      </ListItem>
      <ListItem>
        <Anchor
          component={Link}
          href={"https://www.ianlewis.org/en/container-runtimes-part-1-introduction-container-r"}
        >
          A short series about container runtimes by Ian Lewis
        </Anchor>
      </ListItem>
    </List>
    <Title order={2}>An overview</Title>

    <Title order={3}>Linux namespaces</Title>
    <Text>
      A Linux namespace is a way of isolating something. You can think of a namespace as a way of &apos;unsharing&apos;
      something from the host (i.e. making it distinct or separate from the host machine). There are different types of
      namespaces in Linux...
    </Text>
    <List>
      <ListItem>PID</ListItem>
      <ListItem>Networking</ListItem>
      <ListItem>Mount</ListItem>
    </List>

    <Title order={5}>PID namespaces</Title>
    <Text>
      These cause a program to become PID 1. Children become other processes and from the perspective of all programs
      inside these namespaces, all other programs running on the host machine do not exist.
    </Text>

    <Title order={5}>Networking namespaces</Title>
    <Text>
      These allow a program to listen / run on any port even if another program thinks it is also using that port. It is
      essentially a &apos;virtual&apos; port.
    </Text>

    <Title order={5}>Mount namespaces</Title>
    <Text>
      These allow you to mount / unmount filesystems without it affecting / clutering the host machine. You can mount
      e.g. different devices without them being accessible to the host machine.
    </Text>

    <Text>
      You can create namespaces for different things using the <Code>unshare</Code> command. This command matches the
      name of the underlying system call that gets executed in order to perform this action.
    </Text>

    <Title order={3}>Linux cgroups</Title>
    <Text>
      Linux cgroups allow you to specify resource constraints for programs, such as for memory or CPU; cgroups stands
      for &apos;control groups&apos;. You can think of the naming being it is &apos;controlling&apos; /
      &apos;constraining&apos; access to system resources. You can create cgroups with the <Code>cgcreate</Code> command
      and run a program &apos;within&apos; a control group using the <Code>cgexec</Code> command. Commands for control
      groups may not be available by default on a Linux distribution. When using apt, you can install them (at the time
      of writing) with the <Code>cgroup-tools</Code> package.
    </Text>

    <Text>
      As per the help page for <Code>cgcreate</Code>
    </Text>

    <Code block>{cgcreateHelpPage}</Code>

    <Text>
      The simplest way to run the command is by specifying the <Code>-g</Code> option to specify the control group that
      should be added and the path at which it should be added to. The control group is something that is defined by the
      kernel, not by you. the path at which it should be added to is specified by you. For example, running{" "}
      <Code>cgcreate -g memory:foo</Code> will create a directory entry at <Code>/sys/fs/cgroup/foo</Code>. Within this
      directory are files with names representing the control on a resource such as memory.
    </Text>

    <Text>
      You can then execute a program using the specified cgroup constraints with the <Code>cgexec</Code> command; the
      man page for which is shown below
    </Text>

    <Code block>{cgexecHelpPage}</Code>

    <Text>
      For example, running <Code>cgexec -g memory:foo &lt;binary&gt;</Code> would execute that binary using the
      specified constraints for the specified constraint group.
    </Text>

    <Text>Modifying cgroups will not work by default in Docker containers.</Text>

    <Text>
      In addition to restricting resources available to a binary, you can restrict system calls the binary is able to
      run; for example, to disallow any system calls relating to networking. The Linux kernel has a feature called{" "}
      <Code>seccomp-bpf</Code> to enable this restriction.
    </Text>

    <Title order={3}>Container runtimes</Title>
  </>
);

export default function Notes() {
  return (
    <Container size={"sm"} mt={"xl"} mb={"xl"}>
      <Stack>{pageContent}</Stack>
    </Container>
  );
}
