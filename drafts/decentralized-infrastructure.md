---
layout: post
title: The Promise of Decentralized Infrastructure
date: '2018-04-20T23:55:00.000-08:00'
author: Eli Sohl
nobreak: True
---


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

This is not the first time these ideas have come around -- it's worth mentioning Gnutella, Freenet and its Freesites, as well as Mainline DHT, which is a successful and heavily used distributed hash table, though not a well-secured one. These are all systems whose successes are inspirational and whose failures can be learned from.

Not only that, but home computers have higher specs than ever before, and they keep getting better. This makes it easier to put together a distributed system using peers' excess resources. Advances in practical cryptography are also constantly being made.

I also believe that the social climate is shifting. Issues like copyright are being viewed perhaps more critically now than ever. Questions of censorship are no longer even close to hypothetical. Net neutrality is on schedule to be eliminated in less than a month in spite of overwhelming public support (though [the fight's not over yet](https://boingboing.net/2018/05/18/call-now-2.html)). The systemic problems of our information society are reaching a point where they can no longer be ignored. Distributed systems requiring large networks of volunteers rely on heavy adoption, which in turn depends on a level of moral clarity that may now be easier to convey than ever before.
