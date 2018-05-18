Say you want to take a website offline. Maybe you have a good reason, or maybe you don't.

Most of the time, you'd be out of luck. After all, sites are served by servers, and servers are serious stuff. Taking down your target site means taking down its servers or cutting them off from the world. Neither option is particularly easy.

As far as cutting someone off from the world, which amounts to attacking the infrastructure they use: Getting someone dropped from their hosting provider is only possible if you've got a pretty good reason. DNS hijacking is not what it once was. DDoS is expensive, and not nearly as potent as it used to be -- a couple months ago, GitHub survived a record-setting 1.35Tb/s DDoS with only a few minutes of downtime. Most other infrastructure attacks are no easier.

As far as servers go, it's not easy to overload them, it's not easy to hack them, and usually it's not easy to get at them physically either.

Given such a robust target, the most successful angle of attack people seem to have found is to make legal threats, with the hope of bypassing some of these layers of protection. Copyright infringement is by far the most common basis for such legal action, and sites like Library Genesis, The Pirate Bay, or Sci-Hub provide us with ideal case studies for the capabilities of these attacks.

In essentially all cases the approach is either to apply legal pressure to the hosting provider to sever their agreement with the site, to attempt to seize control of the servers themselves (either through a good, old-fashioned raid or, in the case of cloud hosting, by going through the cloud provider), or to block the site at the ISP level, as the UK has unsuccessfully attempted to do with LibGen.

What's interesting is this: The actual valuable data upon which Sci-Hub, TPB, and LibGen are built is in each case essentially an index. These sites are very large indices of content, and their value comes from being able to serve that content to you on-demand, perhaps tailored to a search query. What's interesting is that this concept is completely infrastructure-agnostic. If we could find a way of sharing an index without the centralized infrastructure of a web server (or a herd of web servers), we would render all these attacks irrelevant. A distributed data structure capable of filling the role of an API server combined with a locally stored web interface built to hook into that API would be able to provide equivalent functionality with none of a centralized server's weaknesses.

Of course, this is not quite a new idea per se. It resembles Freenet's "Freesites", for instance.

At the same time, though, it's not quite an old idea either. This is because it gets more viable with each passing year, as home computers grow in strength, connection bandwidth and IPv6 adoption both slowly crawl upwards, and research on distributed algorithms continues to yield improvements.

Not only that, but I believe the political climate is shifting. Issues like copyright are being viewed perhaps more critically now than ever. Questions of censorship are no longer hypothetical. Net neutrality is being eliminated in less than a month in spite of overwhelming public support. The systemic problems of our information society are reaching a point where they can no longer be ignored. Distributed systems requiring a large network of volunteers rely on heavy adoption, which in turn relies on a level of moral clarity which may be easier to communicate now than it ever has been before.
























Conceptually, most websites exist only as attractive front-ends for some underlying index of data. Sites whose indices include copyrighted data, like Sci-Hub and The Pirate Bay, often face legal threats. A primary aim of these threats is to disrupt the target website itself. These methods of disruption generally target either the hosting infrastructure, the host organization, or the servers themselves.

States with a great degree of control over network infrastructure, like the US and China, tend to use tactics which take advantage of this leverage. Sci-Hub and TPB have both frequently had to change domains after their hosting providers were put under duress (TODO: cite). These high-leverage adversaries also have a unique position to perform content filtering or more sophisticated attacks at the network protocol level. This sort of filtering is a favored tactic of China and has been toyed with by the UK as well. US government agencies broadly seem to favor, and regularly engage in, higher-level and less visible attacks, and to prioritize surveillance over censorship. However, private US-based ISPs regularly engage in content filtering and throttling, and lobby the government heavily to broaden their powers in this area -- current examples of this emerging almost nonstop from the debacle of Ajit Pai's tenure at the FCC.

When politically controversial content is hosted on a subsection of a broader site, as for instance with the "adult" sections of Craigslist and Backpage, legal threats against the broader site are often sufficient to have this subsection dropped, as has happened with both aforementioned pages.

The servers themselves can be disrupted trivially through legal threats if the host is a cloud provider. On the other hand, if a site is self-hosted and the servers can be located, they can be raided and confiscated.

Let's take a second to think about dependencies: The content info needs something to host it and proxy access to it, e.g. a server. The host needs a slew of protocols and infrastructure to receive and respond to remote requests. In many cases there also needs to be some legally associated entity to pay for things like hosting fees, staff, etc.

The value of a website derives from the index it provides access to. On the other hand, the threats to a website all the dependencies and infrastructure surrounding the index. It follows that replacing these dependencies would neutralize all their corresponding attacks, thereby counteracting all of the internet's currently-prevalent forms of censorship, and that any distributed data structure capable of providing peers with access to a meaningful index of data is a candidate for such a replacement.

Distributed, peer-to-peer algorithms run on volunteer power, memory, clock cycles, and bandwidth, and thus their upkeep cost (inasmuch as they can be said to have one) is paid collectively and transparently. They also don't require communication with any central server, making strategies like IP-based forensics significantly less straightforward and removing the need for fragile protocols like DNS entirely. The need to provide for central servers is also removed, doing away with the main central points of failure for any website.

However, distributed systems give rise to their own sets of challenges. Data pollution, exponential growth in bandwidth overhead, consensus issues, dishonest peers, Sybil attacks, inefficient routing, fragility under high peer churn, inability to provide strong guarantees of network properties, lack of encryption or authentication, poor performance, extreme local overhead -- all these problems and more crop up with startling frequency and tend to be hard to resolve.

These, however, are _design_ challenges. As such, there's no reason why a properly designed distributed system couldn't overcome them. This is not an easy task, but it doesn't seem to be impossible either.

The goal of the Theseus DHT, needless to say, is to provide such a system. The goal of the actual Theseus application will be to demonstrate the DHT's ability to host real, significant, performant applications, accessed by the user through a familiar (though locally hosted) web interface.

The successful construction of such a system would serve as a powerful proof of concept for the idea that there can be more to the internet than just the web.
