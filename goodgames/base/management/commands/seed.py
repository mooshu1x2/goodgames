from django.core.management import BaseCommand, call_command


class Command(BaseCommand):

    help = "Seeds the database with curated data."

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting the database seeder. Hang on...'))
        # call_command('runscript', 'seed', '--settings', 'settings.dev')
        call_command('runscript', 'seed')
        self.stdout.write(self.style.SUCCESS('Database successfully seeded.'))
