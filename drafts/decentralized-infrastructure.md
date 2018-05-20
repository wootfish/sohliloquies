---
layout: post
title: The Potential of Decentralized Infrastructure
date: '2018-04-20'
author: Eli Sohl
nobreak: True
---


Conceptually, most websites exist as attractive front-ends for some underlying index of data. If some of the data indexed by a site is under copyright, as with (say) Sci-Hub or The Pirate Bay, then the site faces considerable legal threats. These threats are aimed at disrupting both the site itself and the person or organization behind it.

States with a great degree of influence over their network infrastructure, like the US and China, often use tactics which take advantage of this control. For instance, Sci-Hub and TPB have both frequently had to change domains after their hosting providers were placed under [considerable legal pressure](TODO). China firewalls access to sites on its portion of the internet [very aggressively](TODO cite the n thing). This sort of filtering has been toyed with by many other countries as well, including the UK.

US government agencies broadly seem to prefer and regularly engage in less overt malicious activity, and to prioritize surveillance over censorship. However, this could be viewed as delegating their dirty work to private ISPs, who in turn do regularly engage in content filtering and throttling, and who are constantly lobbying to broaden their powers in these areas.

In cases where politically controversial or legally dubious content is hosted on a subsection of a broader site -- as for instance with the "adult" sections on Craigslist and Backpage -- legal threats against the broader site are effective for inducing the site to drop these subsections, as has now happened with both the aforementioned pages. As an aside, these removals and the legislation which enabled them have both been roundly criticized [from all sides](TODO).

Servers themselves can be disrupted trivially through legal threats if the host is a cloud provider. On the other hand, if a site is self-hosted and its servers can be located, they can be physically raided and confiscated or destroyed. Advanced attackers like state intelligence agencies also are known to hoard powerful exploits which likely give them the ability to compromise many types of servers remotely.

Let's pause for a second to think about dependencies. Our index of data needs something to host it and proxy access to it, like a server. A server needs a whole bunch of protocols and infrastructure to get it talking to other computers and answering their requests. Also, when bills start getting involved (e.g. hosting fees, staff, etc), it often helps to have some legal entity, either corporate or individual, associated with the site.

Now, the value of most websites derives from the underlying index of data that they provides access to and from the quality of the access they provide. However, the _threats_ to a website all target the dependencies and infrastructure surrounding this index.

It follows that replacing these dependencies -- i.e. hosting the index somewhere other than on a server -- would neutralize all these threats. This would automatically obsolete all prevalent forms of internet censorship. It also follows that any distributed data structure capable of providing peers with performant access to a meaningful index of data would be a candidate for serving as this alternate host.

Distributed, peer-to-peer algorithms run on volunteer power, memory, clock cycles, and bandwidth, and thus their upkeep cost (inasmuch as they can be said to have such) is paid collectively and transparently. They also don't require communication with any central server, which makes surveillance/censorship strategies like IP-based forensics or site blacklisting significantly less effective. This shift potentially removes the need for fragile protocols like DNS as well, and of course the need to provide any central servers is also gone (though of course anyone who wants to donate server time to the network is free to do so). Eliminating central servers means eliminating most sites' central points of failure.

Of course, distributed systems tend to give rise to their own sets of challenges. Data pollution, consensus issues, exponential growth in bandwidth overhead, dishonest peers, Sybil attacks, inefficient routing, fragility under high peer churn, inability to provide strong guarantees of network properties, poor performance, lack of encryption or authentication, extreme local resource overhead -- all these problems and more crop up with startling frequency, and they tend to be hard to resolve.

Hard, that is, but not impossible. These are all _design_ challenges. As such, there doesn't seem to be any good reason why a properly designed system couldn't overcome them.

This is not the first time these ideas have come around -- it's worth mentioning Gnutella, Freenet and its Freesites, as well as Mainline DHT (which is a successful and heavily used distributed hash table, though not a well-secured one). These are all systems whose successes are inspirational and whose failures are instructive. In computer science, as elsewhere, we stand on the shoulders of giants.

Home computers also have higher specs than ever before, and they keep getting better. This means that the proposition of building a distributed system out of peers' excess resources grows more reasonable every day. Advances in practical cryptography are constantly being made as well. Argon2 and the Noise Framework are two significant developments from the last few years with direct applicability to distributed systems.

I also believe that the social climate is shifting. Issues like copyright are being viewed perhaps as critically as ever. Questions of censorship are no longer even close to hypothetical. Net neutrality is on schedule to be eliminated in less than a month in spite of overwhelming public support (though [the fight's not over yet](https://boingboing.net/2018/05/18/call-now-2.html)).

The systemic problems of our information society are reaching a point where they can no longer be ignored. For distributed systems designed to resist malicious interference -- including governmental attempts at censorship or surveillance -- the moral clarity required to reach the level of adoption that such a system would need is likely easier to convey now than ever before.

As is probably clear by this point, the primray goal of the Theseus DHT is to provide just such a distributed system. The goal of the actual Theseus application will be to demonstrate this distributed hash table's ability to host real, significant, performant applications' data indices, accessed by users through a familiar (though locally hosted) web interface.

The successful construction of such a system would serve as a powerful proof of concept for the idea that there can be more to the internet than just the web. More than that, it would be a triumph for the ideals of [open access](https://en.wikipedia.org/wiki/Open_access) and democratization of data. 
