from django.db import models


class ReferralLink(models.Model):
    """
    Specifies a route through which customer referrals can be tracked.
    """

    # The distinct part of the route, which identifies the referral link.
    # Max of 126 to fit in PostgreSQL's short string requirement.
    title = models.CharField(max_length=126)

    # Counts the number of times this referral link has been used.
    hits = models.PositiveIntegerField(default=0)
