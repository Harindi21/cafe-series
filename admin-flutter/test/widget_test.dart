import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:kirikopi_cafe_admin/src/app.dart';
import 'package:kirikopi_cafe_admin/src/catalog/catalog_models.dart';
import 'package:kirikopi_cafe_admin/src/catalog/catalog_repository.dart';

void main() {
  testWidgets('app starts on catalog page', (tester) async {
    await tester.pumpWidget(
      ProviderScope(
        overrides: [
          catalogProvider.overrideWith((ref) async => const <MenuCategory>[]),
        ],
        child: const KirikopiAdminApp(),
      ),
    );

    await tester.pumpAndSettle();

    expect(find.text('Catalog'), findsOneWidget);
  });
}
