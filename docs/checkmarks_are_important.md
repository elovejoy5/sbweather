# I love checkmarks

Having robust CI and CD automation is like having a cell phone. Sure, you can go camping in no-signal-land and think about life before the radios that distract us, but once you get used to CI/CD/Tests/... you never want to go back unless you're doing some kind of wierd historical re-enactment of the bad old days when all the software develment tools were terrible.

I know this because I finally started getting green checkmarks again in github after a couple of days of getting stuff setup and not having checkmarks, and it was a huge relief to see them.

Checkmarks require effort. Entropy means that over time tests can start to get flacky, and often tests will stop working even when everything except the test is working. So it's not uncommon to hear a straw man suggest that their PR didn't cause the test to fail, the test is flaky, they really want to move onto the next thing.

This is one of the roots of evil.

The straw man is delightful, a lovely creature. But they just don't want to deal with test automation, and CI, and the horror of not understanding why a test that has been fine for months and months is all of a sudden failing. Or maybe a few tests. But to ignore failing tests is like not getting oil changes. Eventually bad things happen in production, to the people who need the software to work. And then you're hosed, because the tests are flaky, and you can't quickly write a new test and deploy a fix.

On the other hand, if you have a lot of checkmarks in your recent commits, if you need to jump on an issue, you can write a test for the issue, get that test to go green, and if everything is passing, which isn't that hard when your tests are solid and not flaky, then you quickly push the fix to production, and you're done.

Not done and looking over your shoulder, wondering if the other shoe is about to drop. You're done, the issue is fixed, and, if you have reasonable coverage, you don't have to worry about having broken something else.

You could have. Software breaks all the time. But if you have lots of good quality tests, the software gets more solid, not less solid over time. And because you're not looking over your shoulder, you're looking forward. You're getting more done.

And that's why we're here. To get more done.

Checkmarks are awesome.
