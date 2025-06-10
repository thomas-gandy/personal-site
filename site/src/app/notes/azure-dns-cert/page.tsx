import {
  Container,
  Stack,
  Text,
  Title,
  List,
  ListItem,
  Code,
  Anchor,
  Divider,
} from "@mantine/core";
import Link from "next/link";

function Sp() {
  return <>&nbsp;&nbsp;</>;
}

const terraformAppService = `resource "azurerm_service_plan" "plan" {
  name                = "asp"
  os_type             = "Linux"

  ...
}

resource "azurerm_linux_web_app" "site" {
  name                = "app-site"
  service_plan_id     = azurerm_service_plan.plan.id

  ...
}
`;

const terraformCNAME = `resource "azurerm_dns_cname_record" "site" {
  name                = "app.company.com"
  zone_name           = azurerm_dns_zone.dns.name
  resource_group_name = azurerm_resource_group.app_service_plan.name
  ttl                 = 300
  record              = azurerm_linux_web_app.site.default_hostname
}
`;

const terraform = `resource "azurerm_dns_txt_record" "site" {
  name                = "asuid.gpt.alloyed.com"
  zone_name           = azurerm_dns_zone.dns.name
  resource_group_name = azurerm_resource_group.app_service_plan.name
  ttl                 = 300

  record {
    value = azurerm_linux_web_app.site.custom_domain_verification_id
  }
}

resource "azurerm_app_service_custom_hostname_binding" "site" {
  hostname            = azurerm_dns_cname_record.site.zone_name
  app_service_name    = azurerm_linux_web_app.site.name
  resource_group_name = azurerm_resource_group.app_service_plan.name
}

resource "azurerm_app_service_managed_certificate" "site" {
  custom_hostname_binding_id = azurerm_app_service_custom_hostname_binding.site.id
}

resource "azurerm_app_service_certificate_binding" "site" {
  hostname_binding_id = azurerm_app_service_custom_hostname_binding.site.id
  certificate_id      = azurerm_app_service_managed_certificate.site.id
  ssl_state           = "SniEnabled"
}
`;

const appServiceDocsURL = "https://docs.azure.cn/en-us/app-service/";
const appGatewayDocsURL = "https://learn.microsoft.com/en-us/azure/application-gateway/";
const dnsZoneDocsURL = "https://learn.microsoft.com/en-us/azure/dns/dns-zones-records";
const dnsRfcURL = "https://www.rfc-editor.org/rfc/rfc1035.html";

const intro = (
  <>
    <Title>Azure DNS Certificate Management</Title>
    <Text>
      I go through certificate creation using two separate methods.
      <Sp />
      First with Azure App Service&apos;s Managed Certificates, and secondly with Azure Application
      Gateway using Key Vault certificates.
      <Sp />
      The Application Gateway method is useful as it can be a TLS termination point so HTTP can be
      used behind it.
      <Sp />A lot of what I&apos;ve noted down here comes from the official Azure documentation
      for&nbsp;
      <Anchor component={Link} href={appServiceDocsURL}>
        App Service
      </Anchor>
      ,&nbsp;
      <Anchor component={Link} href={appGatewayDocsURL}>
        Application Gateway
      </Anchor>{" "}
      and&nbsp;
      <Anchor component={Link} href={dnsZoneDocsURL}>
        Public DNS Zone
      </Anchor>
      , as well as from the&nbsp;
      <Anchor component={Link} href={dnsRfcURL}>
        DNS RFC
      </Anchor>
      .
    </Text>
  </>
);

const managedCerts = (
  <>
    <Title order={2}>App Service Managed Certificates</Title>
    <Text>
      Managed Certificates require the use of Azure Public DNS Zones. Managed Certificates are bound
      to a domain name provided by an Azure Public DNS Zone. You should understand Azure Public DNS
      Zones before understanding how Managed Certificates work.
    </Text>

    <Title order={3}>Azure Public DNS Zones</Title>
    <Text>
      Your domain registrar will delegate its requests to the Azure Public DNS Zone hosting service
      through a process known as DNS zone delegation. As such, you should understand the difference
      between a registrar and hosting service, as well as what DNS zone delegation is, before
      understanding how Azure Public DNS Zones work.
    </Text>

    <Title order={4}>Registrar</Title>
    <Text>
      A registrar allows you to purchase ownership over a domain. Domains are heirarchical. The root
      domain is referenced simply as <Code>.</Code>. Child domains underneath the root domain are
      called top-level domains. Examples of top level domains include <Code>com</Code>,{" "}
      <Code>uk</Code>, and <Code>org</Code>. Underneath the top-level domains are the second-level
      domains. Examples of second-level domains are <Code>co</Code>
      &nbsp;(producing e.g. <Code>co.uk</Code>), and <Code>org</Code>. Notice some second-level
      domains have the same name as some top-level domains. This hierarchy then continues. Chained
      together, these domain names form a domain (e.g. <Code>co.uk</Code> or <Code>app.co.uk</Code>
      ).
    </Text>
    <Text>
      Typically, the <Code>.</Code> representing the root domain is not typed out. However, if you
      are creating DNS records in a hosting service (described below) then dependening on the
      hosting service, you may be told to add a trailing <Code>.</Code> to your record.
    </Text>
    <Text>
      By purchasing a domain from a registrar, you legally own that domain and any subdomain created
      from it. However, aside from the legal aspect, nothing practically useful occurs from the
      purchase. To have practical value, you need a hosting service to create DNS records for the
      domain so it can point to other machines.
    </Text>

    <Title order={4}>Hosting Service</Title>
    <Text>
      Every single fully-qualified domain in a DNS hierarchy that you may or may not own exists as a
      separate &apos;zone&apos;. For example, <Code>app.co.uk</Code> could be the name of a DNS
      zone. Not every domain name forms a DNS zone. Whilst it is true that the root domain has a DNS
      zone and so will the top-level domains, a second-level domain name in isolation will not form
      a DNS zone (e.g. just <Code>co</Code>). Chained together up to the root domain, it can be
      uniquely identified as e.g. <Code>co.uk</Code>, so can be represented with a DNS zone. A DNS
      zone is hosted on a server and simply contains a collection of records. The organisation that
      provides this server is known as a DNS hosting service.
    </Text>
    <Text>
      Example records a DNS zone may contain are records pointing to subdomains of the current
      domain and apex records to identify the IPv4/6 address of the intended server.
    </Text>

    <Title order={4}>DNS Zone Delegation</Title>
    <Text>
      To understand DNS Zone Delegation, you must first understand the two different types of DNS
      servers: authorative and recursive.
    </Text>

    <Title order={5}>Authorative</Title>
    <Text>
      Authorative DNS servers are what host the DNS zones. They store recordsets. They have the
      ability to answer any queries something may have about that zone. For example, if something
      wants to get the IP address for a domain represented by that zone.
    </Text>

    <Title order={5}>Recursive</Title>
    <Text>
      Recursive DNS servers do not host DNS zones at all. They cannot provide direct answers to
      questions such as &apos;what is the IP for this domain?&apos;. Instead, they call authorative
      servers to perform this task. Azure does not provide recursive DNS servers for end users to
      create.
    </Text>

    <Title order={5}>How authorative and recursive servers work together</Title>
    <Text>
      When a browser is asked to load the page for a site like <Code>app.company.com</Code> it must
      make a request to a DNS server to fetch the IP address of the intended machine; the browser
      itself cannot possibly hold and constantly update every DNS recordset that every DNS zone
      contains. Imagine trying to globally update every single browser on earth when you change a
      DNS record in your hosting service.
    </Text>
    <Text>
      Your browser makes a request to a special server known as a recursive DNS server. This server
      will then begin the DNS lookup and delegation process to authorative DNS servers, starting
      with the root authorative servers. An authorative server makes a delegation by returning a
      special response to the recursive DNS server. Every single time a recursive server recieves a
      delegation from an authorative server, it will then make a new request to the delegated
      server. This all happens opaquely from the browser&apos;s perspective, so it never needs to be
      aware of this process. The advantage of this happening on a dedicated recursive server rather
      than on the client browser itself is that DNS can be updated centrally in one place without
      needing to worry about out-of-sync client browser implementations.
    </Text>
    <Text>
      An authorative server will know which child authoritive server to delegate to upon a request
      from a recursive server due to Name Server (NS) records in the authorative server. For
      example, the root authoritive server would have NS records for the top level domains (e.g.{" "}
      <Code>com.</Code> and&nbsp;
      <Code>uk.</Code>). Remember that the trailing <Code>.</Code> represents the root domain itself
      and is not just a separator between names.
    </Text>
    <Text></Text>

    <Title order={5}>DNS Zone Delegation</Title>
    <Text></Text>

    <Divider />

    <Text>
      In order to make Azure act as the hosting service for your DNS zone purchased from an external
      registrar, you must create a Public DNS Zone in Azure and
    </Text>

    <br />
    <Text>
      Often, organisations act as both a registrar and a hosting service. Well known ones include
    </Text>
    <List>
      <ListItem>Cloudflare</ListItem>
      <ListItem>Mythic Beasts</ListItem>
    </List>
    <Text>
      Azure Public DNS does not currently support purchasing domain names. This means they
      aren&apos;t a domain registrar. It is, however, a hosting service. You are able to use Azure
      DNS servers as hosting for your DNS records. This is really useful for a few different
      reasons.
    </Text>
    <List>
      <ListItem>Use the same IaC to automate compute resources and DNS records</ListItem>
      <ListItem>Use Azure DNS IaC if your current provider has a poor API or no provider</ListItem>
      <ListItem>
        Use Azure DNS if you currently own a domain but have no other hosting service
      </ListItem>
    </List>

    <Title order={3}>Back to managed certificates</Title>
    <Text>
      I wanted to focus on setting up certificates for App Service and any slots it may have. For
      example, you may have a development and production slot that should be accessible at&nbsp;
      <Code style={{ textWrap: "nowrap" }}>dev.app.company.com</Code> and&nbsp;
      <Code style={{ textWrap: "nowrap" }}>app.company.com</Code> respectively.
      <Sp />
      It is important to automate the process of certificate creation and rotation so that you do
      not need to keep manually rotating them every month or two before they expire. I automate
      certificate creation with Terraform, and Azure Managed Certificates takes care of the
      rotation. Unfortunately, Azure has some issues with automating the creation of slot
      certificates which I will get into at the end of the section where I will go through some
      alternative solutions.
    </Text>
    <Text>
      The Terraform below will create the App Service Plan and App Service. It will also create two
      Azure Public DNS Zones. One will be for <Code>app.company.com</Code>
    </Text>
    <Text>
      Before showing the Terraform code to configure a managed certificate for an App Service,
      I&apos;ll just go through the high level concepts of what must be done to have HTTPS for a
      custom domain called <Code style={{ textWrap: "nowrap" }}>app.company.com</Code> set up for an
      App Service site.
    </Text>
    <Text>
      First, the App Service Plan and App Service itself must be created.
      <Sp />
      Azure App Services come preconfigured with an Azure domain name.
      <Sp />
      For example,&nbsp;
      <Code style={{ textWrap: "nowrap" }}>app-site.azurewebsites.net</Code>.<Sp />
      This is nicer than an IP address as Azure is free to change the underlying address whilst you
      still see the same DNS address.
    </Text>
    <Text>
      Second, you will need to create a DNS entry in our provider for&nbsp;
      <Code style={{ textWrap: "nowrap" }}>app.company.com</Code> to point to this Azure domain
      name.
      <Sp />
      Specifically, we will need to create a CNAME entry.
      <Sp />A CNAME entry stands for Canonical Name.
      <Sp />
      Rather than having a DNS A record (known as Apex) entry which maps a domain name to an IPv4
      address, a CNAME entry maps one domain name to another.
    </Text>
    <Text>
      The Azure Terraform provider exposes resources for App Service, App Service Slots, Managed
      Certificates and DNS records.
      <Sp />
      The below shows some Terraform HCL code to deploy an App Service with managed certificates.
      <Sp />
      Irrelevant configuration has been cut out with <Code style={{ textWrap: "nowrap" }}>...</Code>
      .
    </Text>
    <Text>The first step is to create the App Service.</Text>
    <Code block>{terraformAppService}</Code>
    <Text>
      Now that you have access to the Azure generated domain name, you can create a CNAME record
      pointing to it. However, before you can do that you need to make sure you create a&nbsp;
      <Anchor component={Link} href={dnsZoneDocsURL}>
        Public DNS Zone
      </Anchor>
      . A Public DNS zone in Azure
    </Text>
    <Code block>{terraformCNAME}</Code>
    <Code block>{terraform}</Code>
  </>
);

const gatewayCerts = (
  <>
    <Title order={2}>Application Gateway Certificates</Title>
    <Text>
      Azure Application Gateway is a layer 7 load balancer and reverse proxy.
      <Sp />
      It supports reading in certificates from Azure Key Vault.
      <Sp />
      It will poll key vault (at the time of writing) every 4 hours to check if a new certificate
      has been uploaded.
      <Sp />
      If a new certificate is found, it will be automatically rotated in.
    </Text>
  </>
);

export default function Notes() {
  return (
    <Container size={"sm"} mt={"xl"} mb={"xl"}>
      <Stack>
        {intro}
        {managedCerts}
        {gatewayCerts}
        {/* <Title order={2}>Situation</Title>
                <Text>
                    Some of the applications we work on are for internal use.<Space />
                    Most of the machines we own are for simulation work, and people are very protective
                    over their usage.<Space />As a result, the majority of non-simulation applications are
                    containerised and deployed to cloud services.<Space />Whilst we make use of several
                    cloud providers like AWS and GCP, Azure is our main provider.
                </Text>
                <Text>
                    Our internal apps do not need the complexity of a container orchestrator so we do not
                    need to use Azure Container Apps or Kubernetes Service.<Space />VM deployments are a poor
                    choice for us as they need to be managed for updates, do not have native container deployment
                    support, poor logging integration, etc.<Space />Azure App Service fits our needs as it offers:
                </Text>
                <List>
                    <ListItem>Container-based deployments</ListItem>
                    <ListItem>
                        App Slots, allowing us to have
                        <List>
                            <ListItem>
                                Different versions of the app deployed to the same plan simultaneously, such
                                as development and production environments.
                            </ListItem>
                            <ListItem>
                                Zero-downtime deployments by warming up an image in one slot before swapping
                                it to a DNS accessible slot.
                            </ListItem>
                        </List>
                    </ListItem>
                    <ListItem>Low costs for Linux plans</ListItem>
                    <ListItem>
                        Azure Managed Certificates
                        <List>
                            <ListItem>
                                Azure fully manage the certificates, from creation to rotation.
                            </ListItem>
                        </List>
                    </ListItem>
                </List> */}
      </Stack>
    </Container>
  );
}
