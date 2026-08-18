import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:kirikopi_cafe_admin/src/app.dart';

void main() {
  testWidgets('app starts on catalog page', (tester) async {
    await tester.pumpWidget(
      const ProviderScope(child: KirikopiAdminApp()),
    );
    expect(find.text('Catalog'), findsOneWidget);
  });
}
