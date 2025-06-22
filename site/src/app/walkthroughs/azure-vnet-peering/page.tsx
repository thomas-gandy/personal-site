import { Anchor, Code, Container, List, ListItem, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";

const initialSetUp = `| internal company network | <-> | Azure public network |`;

const pageContent = (
  <>
    <Title>Azure-to-site vnet peering</Title>
    <Text>
      In this walkthrough, I&apos;ll go through how to set up peering between a cloud provider like Azure and an
      on-premise like an internal company network.
    </Text>
    <Title order={5}>What is vnet peering and why would you want it?</Title>
    <Text>
      If you don&apos;t have the on-premise resources to deploy apps, you may end up deploying to a cloud provider like
      Azure. For internal apps, you generally wouldn&apos;t want to expose them to public traffic and you probably only
      want traffic originating from e.g. a company network to be able to route through to the deployed app. In Azure,
      this can be achieved with virtual network (vnet) peering and integration.
    </Text>

    <Title order={3}>Useful external alternative resources</Title>
    <Text>Some of the information in this page has come from these resources</Text>
    <List>
      <ListItem>
        <Anchor
          component={Link}
          href={"https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview"}
        >
          Azure virtual networks | Microsoft [site]
        </Anchor>
      </ListItem>
    </List>

    <Title order={2}>Setting the scene</Title>
    <Text>
      You have a web app that, for this scenario, will be deployed to Azure App Service. It needs a place to store files
      so will make use of Azure blob storage. Currently, the setup looks like below
    </Text>
    <Code block>{initialSetUp}</Code>
    <Text>
      By default, App Service is exposed to the public network and there are no real restrictions placed on incoming
      traffic. App service on its own doesn&apos;t provide a mechanism to restrict ingress or egress traffic. However,
      the following Azure resources when combined do
    </Text>
    <List>
      <ListItem>Virtual Network</ListItem>
      <ListItem>Subnet</ListItem>
      <ListItem>Network Security Group (NSG)</ListItem>
    </List>
    <Title order={5}>Azure virtual network</Title>
    <Text>
      As per the Azure documentation, their vnet resource is similar to an actual vnet you would create for a custom
      network.
    </Text>
    <Title order={5}>Azure subnet</Title>
    <Title order={5}>Azure network security group</Title>

    <Title order={2}>Azure virtual network</Title>
    <Text>
      As per the Azure vnet documentation section{" "}
      <Anchor
        component={Link}
        href={
          "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview#communicate-with-on-premises-resources"
        }
      >
        here
      </Anchor>
      , they offer three different ways of communicating with on-premise resources
    </Text>
    <List>
      <ListItem>Point-to-site virtual private network (VPN)</ListItem>
      <ListItem>Site-to-site (S2S) virtual private network (VPN)</ListItem>
      <ListItem>Azure ExpressRoute</ListItem>
    </List>
    <Text>
      Point-to-site connects just a single machine on-premise to Azure&apos;s vnet. Site-to-site connects an entire
      on-premise network or vnet to an Azure vnet. I can&apos;t be bothered to explain Azure ExpressRoute. For this
      walkthrough, we only care about site-to-site.
    </Text>
    <Text>
      In order to set up a S2S connection between an Azure vnet and an on-premise network, the Azure vnet must be
      assigned a VPN gateway.
    </Text>
  </>
);

export default function Notes() {
  return (
    <Container size={"sm"} mt={"xl"} mb={"xl"}>
      <Stack>{pageContent}</Stack>
    </Container>
  );
}
