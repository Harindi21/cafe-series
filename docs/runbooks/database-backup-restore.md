# Database backup and restore runbook

This runbook will become executable when the production hosting target is selected.

Minimum production expectations:

- automated encrypted backups;
- defined retention period;
- point-in-time recovery when the provider supports it;
- access separated from normal application credentials;
- restore rehearsal on a schedule;
- measured recovery time and recovery point objectives;
- a pre-migration backup/restore decision for destructive changes.

A backup that has never been restored in a test is not yet trusted.
