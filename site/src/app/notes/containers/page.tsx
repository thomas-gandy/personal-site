import { Anchor, Code, Container, List, ListItem, Paper, SegmentedControl, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import { motion } from "motion/react";

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

const cgroupFiles = `ls /sys/fs/cgroup/<your-cgroup-name>
cgroup.controllers      cgroup.pressure         cpu.idle        cpu.weight                       cpuset.cpus.partition     hugetlb.2MB.max           io.pressure          memory.low        memory.reclaim       memory.swap.peak  rdma.max
cgroup.events           cgroup.procs            cpu.max         cpu.weight.nice                  cpuset.mems               hugetlb.2MB.numa_stat     io.stat              memory.max        memory.stat          pids.current
cgroup.freeze           cgroup.stat             cpu.max.burst   cpuset.cpus                      cpuset.mems.effective     hugetlb.2MB.rsvd.current  memory.current       memory.min        memory.swap.current  pids.events
cgroup.kill             cgroup.subtree_control  cpu.pressure    cpuset.cpus.effective            hugetlb.2MB.current       hugetlb.2MB.rsvd.max      memory.events        memory.oom.group  memory.swap.events   pids.max
cgroup.max.depth        cgroup.threads          cpu.stat        cpuset.cpus.exclusive            hugetlb.2MB.events        io.latency                memory.events.local  memory.peak       memory.swap.high     pids.peak
cgroup.max.descendants  cgroup.type             cpu.stat.local  cpuset.cpus.exclusive.effective  hugetlb.2MB.events.local  io.max                    memory.high          memory.pressure   memory.swap.max      rdma.current`;

const cgsetHelpPage = `cgset --help
Usage: cgset [-r <name=value>] <cgroup_path> ...
   or: cgset --copy-from <source_cgroup_path> <cgroup_path> ...
Set the parameters of given cgroup(s)
  -r, --variable <name>			Define parameter to set
  --copy-from <source_cgroup_path>	Control group whose parameters will be copied`;

const pageContent = (
  <>
    <Title>Containers</Title>
    <Text>
      Everything about containers, starting from underlying kernel details and runtimes and working up to higher level
      features, rather than the other way around.
    </Text>
    <Title order={3}>Useful external alternative resources</Title>
    <Text>Some of the notes I have made come from these resources</Text>
    <List>
      <ListItem>
        <Anchor component={Link} href={"https://jvns.ca/blog/2016/10/10/what-even-is-a-container/"}>
          What even is a container: namespaces and cgroups | Julia Evans [site]
        </Anchor>
      </ListItem>
      <ListItem>
        <Anchor
          component={Link}
          href={"https://www.ianlewis.org/en/container-runtimes-part-1-introduction-container-r"}
        >
          Container Runtimes | Ian Lewis [site]
        </Anchor>
      </ListItem>
      <ListItem>
        <Anchor component={Link} href={"https://container.training/intro-selfpaced.yml.html"}>
          Introduction to Containers | Container Training (maintained by Jérôme Petazzoni) [site]
        </Anchor>
      </ListItem>
      <ListItem>
        <Anchor component={Link} href={"https://www.youtube.com/watch?v=sK5i-N34im8"}>
          Cgroups, namespaces, and beyond: what are containers made from? | Jérôme Petazzoni [YouTube]
        </Anchor>
      </ListItem>
    </List>

    <Title order={3}>A quick difference between namespaces and cgroups</Title>
    <Text>
      Namespaces are used to restrict what you can <em>see</em>, whether that be filesystems, networks, processes or
      other. On the other hand, cgroups restrict what you can <em>use</em> in terms of resources, whether that be
      memory, CPU, or other. In other words, cgroups restrict computational resources of a process (e.g. memory or cpu),
      and namespaces restrict what external services or features that process can access (e.g. filesystem or network).
    </Text>

    <Title order={3}>Linux namespaces</Title>
    <Text>
      A Linux namespace is a way of isolating something. You can think of a namespace as a way of &apos;unsharing&apos;
      something from the host (i.e. making it distinct or separate from the host machine). Similar to how virtual memory
      works, a namespace is a sort of virtualisation over physical resources, so virtually a process may be allowed
      100MB of primary memory, but in reality the host machine could have 32GB. There are different types of namespaces
      in Linux
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
      essentially a &apos;virtual&apos; port; something that doesn&apos;t really exist but is mapped to something that
      does exist.
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
      for &apos;control groups&apos;. You can think of the reasoning behind the naming being because it is
      &apos;controlling&apos; or &apos;constraining&apos; access to system resources.
    </Text>
    <Text>
      Before jumping into creating cgroups, you should be aware that there are two versions of cgroups: cgroup v1 and
      cgroup v2. You typically modify and interact with v1 cgroups with a set of command line binaries like{" "}
      <Code>cgcreate</Code> and <Code>cgset</Code>. However, with the advent of cgroup v2, it is typical to use standard
      filesystem commands to create and interact with cgroups instead.
    </Text>
    <Text>
      For the rest of this <em>Linux cgroups</em> section, you can select the cgroup version in the segmented control
      below to get information for the version you want.
    </Text>
    <Paper pos={"sticky"} style={{ top: 0, zIndex: 300 }} pb={"xs"} pt={"xs"} radius={"0"}>
      <SegmentedControl w={"100%"} data={["cgroup v1", "cgroup v2"]} />
    </Paper>
    <Text>
      You should also be aware that if you are experimenting with cgroups in a container rather than natively on a Linux
      host or in a Linux VM then it will not work by default. Control groups are a kernel level feature. Containers like
      Docker containers are isolated by default from the host and other containers in pretty much every way except
      kernel space, so are also useful when wanting to experiment with untrusted programs. This level of isolation is
      useful because you do not need to virtualize calls to the kernel, so do not have the overhead of a VM. By default
      you do not want such containers to have unrestricted access to the host machine&apos;s kernel. Doing so would
      allow them to make syscalls to e.g. <Code>unshare</Code>, which would allow them to exit their namespace.
    </Text>
    <Text>
      You can create cgroups with the <Code>cgcreate</Code> command and run a program &apos;within&apos; a control group
      using the <Code>cgexec</Code> command. Commands for control groups that make the required underlying system calls
      the the kernel may not be available by default on a Linux distribution. When using apt, you can install them (at
      the time of writing) with the <Code>cgroup-tools</Code> package.
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
      A natural question to ask is what are the available cgroups? When using cgroups v2 you can inspect the contents of
      the <Code>/sys/fs/cgroup/cgroup.controllers</Code> file to see a space separated list of controller names. For
      example, <Code>cat /sys/fs/cgroup/cgroup.controllers</Code> may provide the following output
    </Text>
    <Code block>cpuset cpu io memory hugetlb pids rdma</Code>
    <Text>
      You can then execute a program using the specified cgroup constraints with the <Code>cgexec</Code> command; the
      man page for which is shown below
    </Text>
    <Code block>{cgexecHelpPage}</Code>
    <Text>
      For example, running <Code>cgexec -g memory:foo &lt;binary&gt;</Code> would execute that binary using the
      specified constraints for the specified constraint group.
    </Text>
    <Text>
      In addition to restricting resources available to a binary, you can restrict system calls the binary is able to
      run; for example, to disallow any system calls relating to networking. The Linux kernel has a feature called{" "}
      <Code>seccomp-bpf</Code> to enable this restriction.
    </Text>

    <Title order={4}>Example: setting up a cgroup for memory</Title>
    <Text>
      To create a control group that limits the allowed memory and CPU and process can use, and then run a process with
      the specified cgroup limits, you first need to create a cgroup like so{" "}
    </Text>
    <Text>
      <Code>cgcreate -g cpu,memory:&lt;your-cgroup-name&gt;</Code>
    </Text>
    <Text>
      This will create a directory entry in <Code>/sys/fs/cgroup</Code> named <Code>&lt;your-cgroup-name&gt;</Code>. If
      you were to <Code>ls</Code> the created files within, you would see something like the following
    </Text>
    <Code block>{cgroupFiles}</Code>
    <Text>
      You may notice there are files prefixed with controller names distinct from what was specified in the initial
      create command. For example, we can see controller names like <Code>pids</Code> and <Code>io</Code> even though
      only the cpu and memory controllers were specified upon creation. This is due to cgroups v2.
    </Text>
    <Text>
      These files prefixed with controller names represent parameters of our cgroup; specifically, each file will
      contain a value or set of values to configure a subset of behaviour of the specified controller type. In the case
      of memory, inspecting the <Code>/sys/fs/cgroup/&lt;your-cgroup-name&gt;/memory.max</Code> parameter file, you can
      see it initially consists of a single value
    </Text>
    <Code block>max</Code>
    <Text>
      So, by default, there are no upper memory restrictions on spawned processes with this cgroup. However, for this
      scenario, we do want an upper limit. Specify parameters for cgroup controllers with the <Code>cgset</Code>{" "}
      command. Inspecting its help command provides us with the following
    </Text>
    <Code block>{cgsetHelpPage}</Code>
    <Text>
      The parameter file we want to set a value for to limit maximum memory access is memory.max. Let&apos;s specify a
      maximum of 100MB which, in bytes, is 100,000,000. Running the following command will update the paramter file
      located at <Code>/sys/fs/cgroup/&lt;your-cgroup-name&gt;/memory.max</Code>
    </Text>
    <Code block>cgset --variable memory.max=100000000 &lt;your-cgroup-name&gt;</Code>
    <Text>If we then inspect the memory.max parameter file, we can see it now has a value of</Text>
    <Code block>99999744</Code>
    <Text>
      Hm. That is odd. Why is it 99,999,744 instead of 100,000,000? 99,999,744 isn&apos;t even a power of 2. The reason
      is because memory limits are aligned to pages. You can inspect your system&apos;s page size using the{" "}
      <Code>getconf</Code> command and specifying a variable name of <Code>PAGE_SIZE</Code>. The result will be returned
      in bytes. On my system, the page size is 4096 bytes. Doing a modulo operation on 100,000,000 and 4096 respectively
      gives the remainder value of 256. So, our specified limit is 256 bytes short of reaching the next divisible page
      boundary. It is safer for the system to round down and provide less memory than to overallocate. So, it rounds
      down the the next divisible page boundary. Hence, we get the result of 99,999,744 which is equivalent to 24,414
      pages.
    </Text>
    <Text>Now the cgroup has been created, you can spawn a process with restrictions specified by that cgroup</Text>

    <Title order={3}>Container runtimes</Title>
    <Text>
      The term &apos;container runtime&apos; is quite generic. There are &apos;high&apos; level and &apos;low&apos;
      level container runtimes. Low level container runtimes are &apos;true&apos; container runtimes in that their sole
      purpose is to just run containers. High level container runtimes are often just a superset of a low level
      container runtime, or delegate the actual running of a container to an existing lower level runtime. High level
      container runtimes generally include additional features like image management and APIs for users to interact with
      them. Examples of low level runtimes are runc and rkt, and example high level runtimes are containerd and cri-o
      who both delegate the actuall running of a container to runc.
    </Text>

    <Title order={4}>Low level runtimes</Title>
    <Text>
      At their core, low level runtimes are in charge of setting up the namespaces and control groups that the container
      will run under. Example low level runtimes are
    </Text>
    <List>
      <ListItem>lmctfy</ListItem>
      <ListItem>runc</ListItem>
      <ListItem>rkt</ListItem>
    </List>
    <Title order={5}>lmctfy</Title>
    <Text>
      Originally made by Google and allowed container hierarchies where &apos;child&apos; containers created by original
      containers could specify additional cgroup constraints with a nested <Code>/sys/fs/cgroup</Code> hierarchy. The
      cgroup for child containers would be based off its parent container. Ultimately, lmctfy was disbanded in favour of
      Docker&apos;s libcontainer.
    </Text>
    <Title order={5}>runc</Title>
    <Text>
      The most popular container runtime. It implements the OCI specification, so it is able to run any container image
      whose format follows the specification.
    </Text>
    <Title order={5}>rkt</Title>
    <Text></Text>

    <Title order={4}>Example: creating a simple container runtime</Title>
    <Text>This section will go through how to set up a </Text>

    <Title order={4}>Additional references</Title>
  </>
);

export default function Notes() {
  return (
    <Container size={"sm"} mt={"xl"} mb={"xl"}>
      <Stack>{pageContent}</Stack>
    </Container>
  );
}
