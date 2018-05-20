---
layout: post
title: The Potential of Decentralized Infrastructure
date: '2018-04-20'
author: Eli Sohl
nobreak: True
---


Conceptually, most websites exist as attractive front-ends for some underlying index of data. If some of the data indexed by a site is under copyright, as with Sci-Hub or The Pirate Bay, then the site itself will faces considerable legal threats aimed at disrupting both the target website itself and the person or organization behind it.

States with a great degree of influence over their network infrastructure, like the US and China, often use tactics which take advantage of this control. For instance, Sci-Hub and TPB have both frequently had to change domains after their hosting providers were placed under considerable legal pressure (TODO: cite), and China firewalls access to sites on its portion of the internet very aggressively (TODO: cite 'n' thing). This sort of filtering has been toyed with by many other countries as well, including the UK.

In contrast, US government agencies broadly seem to prefer and regularly engage in less overt malicious activity, and broadly to prioritize surveillance over censorship. However, this could be viewed as the US delegating their dirty work to private ISPs, who in turn do regularly engage in content filtering and throttling and who are constantly lobbying to broaden their powers in these areas. Ajit Pai's tenure at the FCC has so far driven this home, if nothing else.

In cases where politically controversial content is hosted on a subsection of a broader site, as for instance with the "adult" sections on Craigslist and Backpage, legal threats against the broader site are effective for inducing the site to drop these subsections, as has happened with both the aforementioned pages.

The servers themselves can be disrupted trivially through legal threats if the host is a cloud provider. On the other hand, if a site is self-hosted and its servers can be located, they can be physically raided and confiscated or destroyed.

Let's take a second to think about dependencies: Our index of data needs something to host it and proxy access to it, like a server. The servers need a whole bunch of protocols and infrastructure to get them talking to other computers and answering requests. Also, when bills start getting involved (e.g. hosting fees, staff, etc), it often helps to have some legal entity, corporate or individual, associated with the site.

Now, the value of most websites derives from the index they provides access to and the quality of the access they provide. However, the _threats_ to a website all target dependencies and infrastructure surrounding this index.

It follows that replacing these dependencies -- i.e. hosting the index somewhere other than on a server -- would neutralize all these attacks. This would automatically obsolete all prevalent forms of internet censorship. It also follows that any distributed data structure capable of providing peers with performant access to a meaningful index of data would be a candidate for serving as this alternate host.

Distributed, peer-to-peer algorithms run on volunteer power, memory, clock cycles, and bandwidth, and thus their upkeep cost (inasmuch as they can be said to have one) is paid collectively and transparently. They also don't require communication with any central server, making strategies like IP-based forensics or blacklisting significantly less straightforward and potentially removing the need for fragile protocols like DNS. The need to provide any central servers is also removed, of course, which does away with one of the central points of failure for any website (though of course anyone who wants to donate server time to the network is free to do so).

Of course, distributed systems tend to give rise to their own sets of challenges. Data pollution, consensus issues, exponential growth in bandwidth overhead, dishonest peers, Sybil attacks, inefficient routing, fragility under high peer churn, inability to provide strong guarantees of network properties, poor performance, lack of encryption or authentication, extreme local resource overhead -- all these problems and more crop up with startling frequency, and they tend to be hard to resolve.

Hard, that is, but not impossible. These are _design_ challenges. As such, there's no reason why a properly designed system couldn't overcome them.

This is not the first time these ideas have come around -- it's worth mentioning Gnutella, Freenet and its Freesites, as well as Mainline DHT, which is a successful and heavily used distributed hash table, though not a well-secured one. These are all systems whose successes are inspirational and whose failures can be learned from.

Not only that, but home computers have higher specs than ever before, and they keep getting better. This makes the proposition of building a distributed system out of some of peers' excess resources more reasonable than ever.

Advances in practical cryptography are constantly being made as well. For instance, Argon2 and the Noise Framework are two noteworthy developments from the last few years with direct applicability to distributed systems.

I also believe that the social climate is shifting. Issues like copyright are being viewed perhaps more critically now than ever. Questions of censorship are no longer even close to hypothetical. Net neutrality is on schedule to be eliminated in less than a month in spite of overwhelming public support (though [the fight's not over yet](https://boingboing.net/2018/05/18/call-now-2.html)).

The systemic problems of our information society are reaching a point where they can no longer be ignored. For distributed systems designed to resist all forms of malicious interference, including governmental attempts at censorship or surveillance, the moral clarity required to reach the level of adoption that such a system would need is likely easier to convey now than ever before.

One goal of the Theseus DHT, needless to say, is to provide such a distributed system. The goal of the actual Theseus application will be to demonstrate this distributed hash table's ability to host data for real, significant, performant applications, accessed by users through a familiar (though locally hosted) web interface.

The successful construction of such a system would serve as a powerful proof of concept for the idea that there can be more to the internet than just the web. More than that, it would be a triumph for [open access](https://en.wikipedia.org/wiki/Open_access).
