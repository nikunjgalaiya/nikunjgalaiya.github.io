# UAT and implementation evidence

Run `python -m unittest discover -s tests -v`.

| Requirement | Automated acceptance evidence |
|---|---|
| P1 | Incompatible model and unknown part rejected |
| P2 | Independently expected quote total; quantity and discount boundaries |
| P3 | Frozen price, expiry after 7 days, acceptance on seventh day |
| P4 | Reservation, insufficient stock rollback, concurrent competing approvals |
| P5 | Cancellation release, invalid skip, dispatch exactly once |
| P6 | Identical retry, changed request rejection |
| P7 | Full ordered delivery audit trail |
| P8 | Real local HTTP requests for static assets, quotation round trip, cross-origin rejection and invalid input |

The suite contains 18 domain checks and 4 HTTP integration checks. Tests are executable evidence, not business stakeholder sign-off. Manual acceptance should additionally check keyboard navigation, responsive layout, readable validation errors and clear state transitions.

## Manual demonstration

Create and deliver one quote, then create another quote and cancel after approval. Confirm physical stock changes only for the dispatched quote. Explain why DRAFT does not reserve stock and why ORDERED cancellation releases a reservation. Reset using a fresh database path, keeping the original audit database intact.
