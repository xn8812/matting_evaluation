paths = [
    'IMG_0007',
#    '2298276436_224766aeb3_b',
#    '2428331013_075f888875_b',
#    '4434433439_0c4358dede_b',
#    '5169738390_a98168e624_b',
#    '6732968623_75bb81f48d_b',
#    '8329084809_f67e99ca30_o',
#    '15183701767_d0d2de6bb1_k',
#    '15331200137_0234ac292c_o',
#    '15398582039_0edd89e127_b',
#    '15476407040_33285ba0a9_o',
#    '21765355358_8592c1d8fc_k',
#    '24243767101_7290781952_k',
#    '24422557244_60feff8dfc_k',
#    '25079161836_4b42655396_k',
#    '25126122781_0f9f1152f3_k',
#    'IMG_0293',
#    'IMG_0507',
#    'IMG_0551',
#    'IMG_0581',
#    'IMG_3318',
#    'IMG_3400',
#    'IMG_9751'
]
methods = [
    'dcnn',
    'global',
    'comprehensive',
    'knn',
    'learning',
    'close-form',
    'shared',
    'ours'
]

inputfile = open('hit.input', 'w+')
inputfile.write('vid\n')
for path in paths:
    for idx1 in range(len(methods)-1):
	for idx2 in range(idx1+1,len(methods)):
            inputfile.write('%s/,%s,%s\n'%(path, methods[idx1], methods[idx2]))
inputfile.close()
