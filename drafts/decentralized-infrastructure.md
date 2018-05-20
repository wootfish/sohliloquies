---
layout: post
title: The Potential of Decentralized Infrastructure
date: '2018-04-20'
author: Eli Sohl
nobreak: True
---


Conceptually, most websites exist as attractive front-ends for some underlying index of data. If the data a site is indexing includes copyrighted data, like with Sci-Hub or The Pirate Bay, then the site itself will face legal threats aimed at disrupting the target website itself.

The methods of disruption generally target either the hosting infrastructure, the host organization, or the servers themselves.

States with a great degree of practical or legal influence over their network infrastructure, like the US and China, often use tactics which take advantage of this control. Sci-Hub and TPB have both frequently had to change domains after their hosting providers were placed under significant legal pressure (TODO: cite). These high-leverage adversaries also have a unique position to perform content filtering or more sophisticated attacks at the network protocol level. This sort of filtering is a favored tactic of the Chinese government, and has been toyed with by many other countries as well, including the UK.

US government agencies broadly seem to favor, and regularly engage in, higher-level and less overt attacks, and to prioritize surveillance over censorship. However, private US-based ISPs regularly engage in content filtering and throttling, and they lobby the government heavily to broaden their powers in these areas. Ajit Pai's tenure at the FCC has driven this home, if nothing else.

In cases where politically controversial content is hosted on a subsection of a broader site, as for instance with the "adult" sections on Craigslist and Backpage, legal threats against the broader site are effective for inducing the site to drop these subsections, as has happened with both the aforementioned pages.

The servers themselves can be disrupted trivially through legal threats if the host is a cloud provider. On the other hand, if a site is self-hosted and its servers can be located, they can be physically raided and confiscated or destroyed.

Let's take a second to think about dependencies: Our index of data needs something to host it and proxy access to it, like a server. The server needs a whole bunch of protocols and infrastructure to receive and respond to remote requests. When bills start getting involved (e.g. hosting fees, staff, etc), it also generally helps to have some legal entity, corporate or individual, associated with the site.

The value of a website derives from the index it provides access to and the quality of access it provides. On the other hand, the threats to a website all target dependencies and infrastructure surrounding this index. It follows that replacing these dependencies -- i.e. finding somewhere else than a server to host the index -- would neutralize all these attacks. This would obsolete all currently-prevalent forms of internet censorship. It also follows that any distributed data structure capable of providing peers with performant access to a meaningful index of data is a candidate for serving as this alternate host.

Distributed, peer-to-peer algorithms run on volunteer power, memory, clock cycles, and bandwidth, and thus their upkeep cost (inasmuch as they can be said to have one) is paid collectively and transparently. They also don't require communication with any central server, making strategies like IP-based forensics or blacklisting significantly less straightforward and removing the need for fragile protocols like DNS entirely. The need to run central servers is also removed, doing away with the main central points of failure for any website (though of course anyone who wants to donate server time to the network may do so).

Of course, distributed systems tend to give rise to their own sets of challenges. Data pollution, consensus issues, exponential growth in bandwidth overhead, dishonest peers, Sybil attacks, inefficient routing, fragility under high peer churn, inability to provide strong guarantees of network properties, lack of encryption or authentication, poor performance, extreme local overhead -- all these problems and more crop up with startling frequency, and they tend to be hard to resolve.

That is, hard but not impossible. These are _design_ challenges. As such, there's no reason why a properly designed system couldn't overcome them.

The goal of the Theseus DHT, needless to say, is to provide such a distributed system. The goal of the actual Theseus application will be to demonstrate the DHT's ability to host real, significant, performant applications, accessed by the user through a familiar (though locally hosted) web interface.

The successful construction of such a system would serve as a powerful proof of concept for the idea that there can be more to the internet than just the web.

This is not the first time these ideas have come around -- it's worth mentioning Gnutella, Freenet and its Freesites, as well as Mainline DHT, which is a successful and heavily used distributed hash table, though not a well-secured one. These are all systems whose successes are inspirational and whose failures can be learned from.

Not only that, but home computers have higher specs than ever before, and they keep getting better. This makes it easier to put together a distributed system using peers' excess resources. Advances in practical cryptography are also constantly being made.

I also believe that the social climate is shifting. Issues like copyright are being viewed perhaps more critically now than ever. Questions of censorship are no longer even close to hypothetical. Net neutrality is on schedule to be eliminated in less than a month in spite of overwhelming public support (though [the fight's not over yet](https://boingboing.net/2018/05/18/call-now-2.html)). The systemic problems of our information society are reaching a point where they can no longer be ignored. Distributed systems requiring large networks of volunteers rely on heavy adoption, which in turn depends on a level of moral clarity that may now be easier to convey than ever before.


